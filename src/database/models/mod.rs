use sqlx::{Error, Executor, PgConnection, Row};
use crate::database::database_client::get_database_connection;

pub struct UserModel{
    con: PgConnection,
    first_name: String,
    last_name: String,
    email: String,
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

        return Ok(UserModel{
            con,
            first_name: user_data.get("first_name"),
            last_name: user_data.get("last_name"),
            email: user_data.get("email")
        })
    }

}

