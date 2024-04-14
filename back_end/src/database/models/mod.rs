use sqlx::{Connection, Error, Executor, PgConnection, Row};
use crate::database::database_client::get_database_connection;
use bcrypt::{hash, DEFAULT_COST};

pub trait DatabaseModel {
    type Model;
    async fn get_by_id(id: u32) -> Result<Self::Model, Error>;
    async fn delete_by_id(id: u32) -> Result<(), Error>;
}

#[derive(Debug)]
pub struct UserModel{
    first_name: String,
    last_name: String,
    email: String,
}

impl DatabaseModel for UserModel {
    type Model = Self;

    async fn get_by_id(id: u32) -> Result<Self::Model, Error> {
        let mut con = get_database_connection().await?;

        let user_data = sqlx::query!("SELECT * FROM user_table WHERE id = $1;", id as i32)
            .fetch_one(&mut con)
            .await?;

        con.close().await?;
        return Ok(UserModel{
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email: user_data.email
        });
    }

    async fn delete_by_id(id: u32) -> Result<(), Error> {
        let mut con = get_database_connection().await?;
        sqlx::query!("DELETE FROM user_table WHERE id = $1;", id as i32)
            .execute(&mut con)
            .await?;
        con.close().await?;
        return Ok(());
    }
}

impl UserModel{
    pub async fn fetch_from_token (token: &str) -> Result<Self, Error> {
        let mut con = get_database_connection().await?;
        let token_data = sqlx::query!("SELECT * FROM token_table WHERE token = $1;", token)
            .fetch_one(&mut con)
            .await?;

        let user_id = match token_data.user_id{
            Some(e) => e,
            None => return Err(Error::RowNotFound)
        };

        let user_data = sqlx::query(&format!("SELECT * FROM user WHERE id = {}", user_id))
            .fetch_one(&mut con)
            .await?;

        con.close().await?; // send termination to the db server, not required but can make the server more efficient in handling new requests

        return Ok(UserModel{
            first_name: user_data.get("first_name"),
            last_name: user_data.get("last_name"),
            email: user_data.get("email")
        })
    }

    pub async fn create_new_user(email: &str, password: &str, first_name: &str, last_name: &str) -> Result<Self, Error> {

        let hashed_password = hash(password, DEFAULT_COST).expect("bcrypt failed");

        let retal = UserModel{
            email: email.to_string(),
            first_name: email.to_string(),
            last_name: last_name.to_string(),
        };

        let mut con = get_database_connection().await?;
        let query = sqlx::query!(
          "INSERT INTO user_table (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
            first_name,
            last_name,
            email,
            hashed_password
        );

        con.execute(query).await?;
        con.close().await?;

        Ok(retal)
    }

    pub async fn get_by_email_and_password(email: &str, password: &str) -> Result<Self, Error> {
        let hashed_password = hash(password, DEFAULT_COST).expect("bcrypt failed");
        let mut con = get_database_connection().await?;
        let user_data = sqlx::query!("SELECT * FROM user_table WHERE email = $1 AND password = $2", email, hashed_password)
            .fetch_one(&mut con)
            .await?;
        con.close().await?;
        return Ok(UserModel{
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email: user_data.email
        });
    }

}

