use sqlx::{Connection, Error, Executor};
use crate::database::database_client::get_database_connection;
use bcrypt::{hash, DEFAULT_COST, verify};
use sqlx::types::chrono;
use chrono::{NaiveDateTime, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use std::env;
use sqlx::encode::IsNull::No;
use crate::interceptors::auth_interceptor::JwtClaims;


pub trait DatabaseModel {
    type Model;
    async fn delete(&self) -> Result<(), Error>;
    async fn update(&self) -> Result<(), Error>;
}

#[derive(Debug)]
pub struct UserModel{
    id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub active: bool
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
    pub fn get_id(&self) -> i32 {
        self.id
    }

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
            email: user_data.email,
            active: user_data.active
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
            active: newly_created.active
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
            email: user_data.email,
            active: user_data.active
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


struct TweetModel{
    id: i32,
    pub user_id: i32,
    pub content: String,
    pub title: String,
    pub parent_id: Option<i32>
}

impl DatabaseModel for TweetModel {
    type Model = ();
    


    async fn delete(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("DELETE FROM tweet_table WHERE id = $1", self.id)
            .execute(&mut  con)
            .await?;

        con.close().await?;

        Ok(())
    }

    async fn update(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("UPDATE tweet_table SET user_id = $1, content = $2, title = $3, parent_id = $4, updated_at = $5 WHERE id = $6", self.user_id, self.content, self.title, self.parent_id, Utc::now().naive_utc(), self.id)
            .execute(&mut  con)
            .await?;

        con.close().await?;

        Ok(())
    }
    
}


impl TweetModel{
    fn get_id(&self) -> i32{
        self.id
    }

    async fn get_by_id(tweet_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT * FROM tweet_table WHERE id = $1;;", tweet_id)
            .fetch_one(&mut con).await?;

        return Ok(TweetModel{
            id: record.id,
            parent_id: record.parent_id,
            title: record.title,
            content: record.content,
            user_id: record.user_id
        });
    }
    
    async fn create_tweet(title: &str, content: &str, parent_id: Option<i32>, user_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;
        let res = sqlx::query!("INSERT INTO tweet_table (title, content, parent_id, user_id) VALUES ($1, $2, $3, $4) RETURNING id;", title, content, parent_id, user_id)
            .fetch_one(&mut con)
            .await?;
        let retval = Self::get_by_id(res.id).await?;
        return Ok(retval);
    }
}

#[derive(Debug)]
pub struct FollowerModel {
    id: i32,
    pub user_id: i32,
    pub follower_id: i32,
}

impl DatabaseModel for FollowerModel {
    type Model = Self;

    async fn delete(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("DELETE FROM follower_table WHERE id = $1", self.id)
            .execute(&mut  con)
            .await?;

        con.close().await?;

        Ok(())
    }

    async fn update(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("UPDATE follower_table SET user_id = $1, follower_id = $2 WHERE id = $3", self.user_id, self.follower_id, self.id)
            .execute(&mut  con)
            .await?;

        con.close().await?;

        Ok(())
    }
}

impl FollowerModel {

    pub async fn get_by_ids(user_id: i32, follower_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT * FROM follower_table WHERE user_id = $1 AND follower_id = $2;", user_id, follower_id)
            .fetch_one(&mut con).await?;

        con.close().await?;
        Ok(FollowerModel{
            id: record.id,
            user_id: record.user_id,
            follower_id: record.follower_id
        })
    }

    pub async fn create_new_follower(user_id: i32, follower_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        sqlx::query!("INSERT INTO follower_table (user_id, follower_id) VALUES ($1, $2);", user_id, follower_id)
            .execute(&mut con).await?;

        con.close().await?;

        Self::get_by_ids(user_id, follower_id).await
    }

    pub async fn get_follower_count_by_user_id(user_id: i32) -> Result<i64, Error>{
        let mut con = get_database_connection().await?;

        let result = sqlx::query!("SELECT COUNT(*) from follower_table WHERE user_id = $1", user_id)
            .fetch_one(&mut con)
            .await?;

        con.close().await?;

        Ok(result.count.unwrap_or(0))
    }


    pub async fn get_following_count_by_user_id(user_id: i32) -> Result<i64, Error>{
        let mut con = get_database_connection().await?;

        let result = sqlx::query!("SELECT COUNT(*) from follower_table WHERE follower_id = $1", user_id)
            .fetch_one(&mut con)
            .await?;

        con.close().await?;

        Ok(result.count.unwrap_or(0))
    }

}
