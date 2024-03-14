use sqlx::{Connection, PgConnection};

pub async fn get_database_connection() -> PgConnection{
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL not set in the .env");
    let mut conn = sqlx::postgres::PgConnection::connect(&db_url).await?;
    return conn;
}