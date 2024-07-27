use sqlx::{Connection, Error, Executor, Row};
use crate::database::database_client::get_database_connection;
use bcrypt::{hash, DEFAULT_COST, verify};
use sqlx::types::chrono;
use chrono::{NaiveDateTime, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use std::env;
use std::time::SystemTime;
use prost_types::Timestamp;
use crate::interceptors::auth_interceptor::JwtClaims;
use crate::services::tweet::proto::TweetRecord;


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
    
    pub async fn fetch_by_id(id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;
        let user_data = sqlx::query!("SELECT * FROM user_table WHERE id = $1;", id)
            .fetch_one(&mut con)
            .await?;
        
        Ok(UserModel{
            id: user_data.id,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            email: user_data.email,
            active: user_data.active
        })
        
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


pub struct TweetModel{
    id: i32,
    pub user_id: i32,
    pub content: String,
    pub title: String,
    pub parent_id: Option<i32>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    likes: i64
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
    pub fn get_id(&self) -> i32{
        self.id
    }

    pub async fn get_by_id(tweet_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT *, (SELECT COUNT(*) FROM like_table WHERE tweet_id = tweet_table.id) as likes FROM tweet_table WHERE id = $1;", tweet_id)
            .fetch_one(&mut con).await?;

        return Ok(TweetModel{
            id: record.id,
            parent_id: record.parent_id,
            title: record.title,
            content: record.content,
            user_id: record.user_id,
            created_at: record.create_at,
            updated_at: record.updated_at,
            likes: record.likes.unwrap_or(0)
        });
    }
    
    pub async fn get_by_user_and_id(tweet_id: i32, user_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;

        let record = sqlx::query!("SELECT *,  (SELECT COUNT(*) FROM like_table WHERE tweet_id = tweet_table.id) as likes FROM tweet_table WHERE id = $1 AND user_id = $2;", tweet_id, user_id)
            .fetch_one(&mut con).await?;

        return Ok(TweetModel{
            id: record.id,
            parent_id: record.parent_id,
            title: record.title,
            content: record.content,
            user_id: record.user_id,
            created_at: record.create_at,
            updated_at: record.updated_at,
            likes: record.likes.unwrap()
        });
    }
    
    pub async fn create_tweet(title: &str, content: &str, parent_id: Option<i32>, user_id: i32) -> Result<Self, Error>{
        let mut con = get_database_connection().await?;
        let res = sqlx::query!("INSERT INTO tweet_table (title, content, parent_id, user_id) VALUES ($1, $2, $3, $4) RETURNING id;", title, content, parent_id, user_id)
            .fetch_one(&mut con)
            .await?;
        let retval = Self::get_by_id(res.id).await?;
        return Ok(retval);
    }
    
    pub async fn get_tweets_by_user_id(user_id: i32, page: i32, limit: i32) -> Result<(Vec<TweetModel>, i64), Error>{
        let mut con = get_database_connection().await?;
        let offset = (page - 1) * limit;
        let res = sqlx::query!("SELECT *,  (SELECT COUNT(*) FROM like_table WHERE tweet_id = tweet_table.id) as likes FROM tweet_table WHERE user_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3;", user_id, i64::from(limit), i64::from(offset))
            .fetch_all(&mut con)
            .await?;
        
        let total = sqlx::query!("SELECT COUNT(*) as total FROM tweet_table where user_id = $1;", user_id)
            .fetch_one(&mut con)
            .await?;
        
        let tweets = res.into_iter().map(|record|{
            TweetModel{
                id: record.id,
                parent_id: record.parent_id,
                title: record.title,
                content: record.content,
                user_id: record.user_id,
                created_at: record.create_at,
                updated_at: record.updated_at,
                likes: record.likes.unwrap_or(0)
            }
        }).collect();

        Ok((tweets, total.total.unwrap_or(0)))
    }
    
    pub async fn get_all_tweets(page: i32, limit: i32) -> Result<(Vec<TweetModel>, i64), Error>{
        let mut con = get_database_connection().await?;
        let offset = (page - 1) * limit;

        let query = "SELECT *, \
                           (SELECT COUNT(*) \
                            FROM like_table \
                            WHERE tweet_id = tweet_table.id\
                           ) as likes \
                           FROM tweet_table  \
                           ORDER BY id \
                           DESC LIMIT $1 OFFSET $2;";

        let res = sqlx::query(&query)
            .bind(i64::from(limit))
            .bind(i64::from(offset))
            .fetch_all(&mut con)
            .await?;

        let total = sqlx::query("SELECT COUNT(*) as total FROM tweet_table;")
            .fetch_one(&mut con)
            .await?;

        let tweets = res.into_iter().map(|record|{
            TweetModel{
                id: record.get("id"),
                parent_id: record.get("parent_id"),
                title: record.get("title"),
                content: record.get("content"),
                user_id: record.get("user_id"),
                created_at: record.get("create_at"),
                updated_at:  record.get("updated_at"),
                likes: record.get("likes")
            }
        }).collect();

        Ok((tweets, total.get("total")))
    }
    
    pub fn to_tweet_records(tweet_models: Vec<TweetModel>)-> Vec<TweetRecord>{
        let tweets: Vec<TweetRecord> = tweet_models.into_iter().map(|tweet|{
            TweetRecord{
                id: tweet.get_id(),
                content: tweet.content,
                title: tweet.title,
                user_id: tweet.user_id,
                created_at: Some(Timestamp::from(SystemTime::from(tweet.created_at.and_utc()))),
                updated_at: Some(Timestamp::from(SystemTime::from(tweet.updated_at.and_utc()))),
                parent_id: tweet.parent_id,
                likes: tweet.likes
            }
        }).collect();
        tweets
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

pub struct LikeModel{
    id: i32,
    user_id: i32,
    tweet_id: Option<i32>,
    comment_id: Option<i32>,
}

impl DatabaseModel for LikeModel {
    type Model = ();

    async fn delete(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;
        sqlx::query!("DELETE FROM follower_table WHERE id = $1", self.id)
            .execute(&mut  con)
            .await?;
        Ok(())
    }

    async fn update(&self) -> Result<(), Error> {
        let mut con = get_database_connection().await?;

        sqlx::query!("UPDATE like_table SET user_id = $1, tweet_id = $2, comment_id = $3, updated_at = $4 WHERE id = $5", self.user_id, self.tweet_id, self.comment_id , Utc::now().naive_utc(), self.id)
            .execute(&mut  con)
            .await?;

        con.close().await?;

        Ok(())
    }
}

impl LikeModel {
    pub async fn find_from_ids(user_id: i32, tweet_id: Option<i32>, comment_id: Option<i32>) -> Result<LikeModel, Error>{
        let mut con = get_database_connection().await?;
        let record =  sqlx::query!("SELECT * FROM like_table WHERE user_id = $1 AND comment_id = $2 AND tweet_id = $3" , user_id, comment_id, tweet_id)
            .fetch_one(&mut  con)
            .await?;
        let retval = LikeModel{
            id: record.id,
            user_id: record.user_id,
            tweet_id: record.tweet_id,
            comment_id: record.comment_id
        };

        con.close().await?;
        Ok(retval)
    }
    
    pub async fn create_new(user_id: i32, tweet_id: Option<i32>, comment_id: Option<i32>) -> Result<LikeModel, Error>{
        let mut con = get_database_connection().await?;
        let time_stamp = Utc::now().naive_utc();
        let record = sqlx::query!("INSERT INTO like_table (user_id, comment_id, tweet_id, create_at) VALUES ($1, $2, $3, $4) RETURNING  *;", user_id, comment_id, tweet_id, time_stamp)
            .fetch_one(&mut con).await?;
        
        con.close().await?;
        
        Ok(LikeModel{
            id: record.id,
            user_id: record.user_id,
            tweet_id: record.tweet_id,
            comment_id: record.comment_id
        })
    }
}