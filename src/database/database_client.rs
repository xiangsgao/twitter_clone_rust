use sqlx::{Connection, Error, PgConnection};

pub async fn get_database_connection() -> Result<PgConnection, Error> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL not set in the .env");
    let conn = sqlx::postgres::PgConnection::connect(&db_url).await?;
    return Ok(conn);
}