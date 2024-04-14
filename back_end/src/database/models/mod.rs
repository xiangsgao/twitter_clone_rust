use sqlx::{Connection, Error, Executor};
use crate::database::database_client::get_database_connection;
use bcrypt::{hash, DEFAULT_COST, verify};
use sqlx::types::chrono;
use chrono::{NaiveDateTime, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use std::env;
use crate::interceptors::auth_interceptor::JwtClaims;


pub trait DatabaseModel {
    type Model;
    async fn delete(&self) -> Result<(), Error>;
    async fn update(&self) -> Result<(), Error>;
}

#[derive(Debug)]
pub struct UserModel{
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
}

impl DatabaseModel for UserModel {
    type Model = Self;

    async fn delete(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("DELETE FROM user_table WHERE id = $1", self.id)
            .execute(&mut con).await?;

        con.close().await?;
        Ok(())
    }

    async fn update(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("UPDATE user_table SET first_name = $1, last_name = $2, email = $3, updated_at = $4 WHERE id = $5;", self.first_name, self.last_name, self.email, Utc::now().naive_utc(), self.id)
            .execute(&mut con).await?;

        con.close().await?;
        Ok(())
    }
}

impl UserModel{
    pub async fn fetch_from_token (token: &str) -> Result<Self, Error> {
        let mut con = get_database_connection().await?;
        let token_data = sqlx::query!("SELECT * FROM token_table WHERE token = $1;", token)
            .fetch_one(&mut con)
            .await?;

        let user_id = token_data.user_id;

        let user_data = sqlx::query!("SELECT * FROM user_table WHERE id = $1;", user_id)
            .fetch_one(&mut con)
            .await?;

        con.close().await?; // send termination to the db server, not required but can make the server more efficient in handling new requests

        return Ok(UserModel{
            id: user_data.id,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email: user_data.email
        })
    }

    pub async fn create_new_user(email: &str, password: &str, first_name: &str, last_name: &str) -> Result<Self, Error> {

        let hashed_password = hash(password, DEFAULT_COST).expect("bcrypt failed");
        let mut con = get_database_connection().await?;
        let query = sqlx::query!(
          "INSERT INTO user_table (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
            first_name,
            last_name,
            email,
            hashed_password
        );

        con.execute(query).await?;
        let newly_created =  sqlx::query!(
          "SELECT * FROM user_table WHERE email = $1",
            email
        ).fetch_one(&mut con).await?;

        con.close().await?;


        let retal = UserModel{
            id: newly_created.id,
            email: newly_created.email,
            first_name: newly_created.first_name,
            last_name: newly_created.last_name,
        };

        Ok(retal)
    }

    pub async fn get_by_email_and_password(email: &str, password: &str) -> Result<Self, Error> {
        let mut con = get_database_connection().await?;
        let user_data = sqlx::query!("SELECT * FROM user_table WHERE email = $1", email)
            .fetch_one(&mut con)
            .await?;
        con.close().await?;

        let valid = verify(password, &user_data.password).expect("failed to verify password hash");

        if !valid{
            return Err(Error::RowNotFound);
        }

        return Ok(UserModel{
            id: user_data.id,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email: user_data.email
        });
    }
}


#[derive(Debug)]
pub struct TokenModel {
    id: i32,
    user_id: i32,
    pub token: String,
    pub created_at: NaiveDateTime
}

impl DatabaseModel for TokenModel {
    type Model = Self;

    async fn delete(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("DELETE FROM token_table WHERE id = $1", self.id)
            .execute(&mut con).await?;

        con.close().await?;
        Ok(())
    }

    async fn update(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;


        sqlx::query!("UPDATE token_table SET token = $1, updated_at = $2 WHERE id = $3;", self.token, Utc::now().naive_utc(), self.id)
            .execute(&mut con).await?;

        con.close().await?;
        Ok(())
    }
}

impl TokenModel {
    pub async fn get_by_token(token: &str) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT * FROM token_table WHERE token = $1;", token)
            .fetch_one(&mut con).await?;

        con.close().await?;
        Ok(TokenModel{
            id: record.id,
            user_id: record.user_id,
            created_at: record.create_at,
            token: record.token
        })
    }

    pub async fn get_by_user_id(user_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT * FROM token_table WHERE user_id = $1", user_id)
            .fetch_one(&mut con).await?;

        con.close().await?;
        Ok(TokenModel{
            id: record.id,
            user_id: record.user_id,
            created_at: record.create_at,
            token: record.token
        })
    }

    // this is essentially a session token
    pub async fn create_token(user_id: i32) -> Result<Self, Error>{
        let key = env::var("JWT_SECRET").expect("jwt key not set in the env");
        let my_claims = JwtClaims {
            user_id
        };

        let timestamp = Utc::now().naive_utc();

        let final_key = &(key.to_string() + &timestamp.to_string())[0..key.len() + 19];

        let token = encode(
            &Header::default(),
            &my_claims,
            &EncodingKey::from_secret(final_key.as_bytes()),
        ).expect("failed to create jwt token");


        let mut con = get_database_connection().await?;

       sqlx::query!("INSERT INTO token_table (user_id, token, create_at) VALUES ($1, $2, $3);", user_id, token, timestamp)
            .execute(&mut con).await?;

        let record = sqlx::query!("SELECT * FROM token_table WHERE user_id = $1", user_id)
            .fetch_one(&mut con).await?;

        con.close().await?;
        Ok(TokenModel{
            id: record.id,
            user_id: record.user_id,
            created_at: record.create_at,
            token: record.token
        })
    }
}
