use sqlx::{Connection, Error, Executor, PgConnection, Row};
use sqlx::postgres::any::AnyConnectionBackend;
use crate::database::database_client::get_database_connection;

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

        let user_data = sqlx::query(&format!("SELECT * FROM user WHERE id = {}", id))
            .fetch_one(&mut con)
            .await?;

        con.close().await?;
        return Ok(UserModel{
            first_name: user_data.get("first_name"),
            last_name: user_data.get("last_name"),
            email: user_data.get("email")
        });
    }

    async fn delete_by_id(id: u32) -> Result<(), Error> {
        let mut con = get_database_connection().await?;
        sqlx::query(&format!("DELETE FROM user_table WHERE id = {}", id))
            .execute(&mut con)
            .await?;
        con.close().await?;
        return Ok(());
    }
}

impl UserModel{
    pub async fn fetch_from_token (token: &str) -> Result<Self, Error> {
        let mut con = get_database_connection().await?;
        let token_data = sqlx::query(&format!("SELECT * FROM token WHERE token = {}", token))
            .fetch_one(&mut con)
            .await?;

        let user_id: &str = token_data.get("user_id");

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



}

