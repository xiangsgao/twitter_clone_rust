use serde::de::Unexpected::Str;
use tonic::{Request, Response, Status};
use crate::database::models::{DatabaseModel, TweetModel, UserModel};
use crate::services::tweet::proto::{CreateTweetRequest, CreateTweetResponse, DeleteTweetRequest, DeleteTweetResponse, EditTweetRequest, EditTweetResponse, GetAllTweetRequest, GetTweetByUserRequest, GetTweetResponse};
use crate::services::tweet::proto::tweet_server::Tweet;

pub mod proto {
    tonic::include_proto!("twitter_clone");
    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] = tonic::include_file_descriptor_set!("twitter_clone_descriptor");
}

#[derive(Debug, Default)]
pub struct TweetService {

}

#[tonic::async_trait]
impl Tweet for TweetService{
    async fn create_tweet(&self, request: Request<CreateTweetRequest>) -> Result<Response<CreateTweetResponse>, Status> {
        let r = request.get_ref();
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        let (content, title, parent_id) = (&r.content, &r.title, r.parent_id);
        match TweetModel::create_tweet(title, content, parent_id, user.get_id()).await{
            Ok(_) => (),
            Err(_) => {
                return Err(Status::internal("Tweet creation failed")); // shouldn't happen, should be caught by the interceptor
            }
        };
        
        return Ok(Response::new(CreateTweetResponse{
            success: true
        }));
        
    }

    async fn delete_tweet(&self, request: Request<DeleteTweetRequest>) -> Result<Response<DeleteTweetResponse>, Status> {
        let id = request.get_ref().tweet_id;

        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        
        let tweet = match TweetModel::get_by_user_and_id(id, user.get_id()).await{
            Ok(t) => t,
            Err(_) => {
                return Err(Status::invalid_argument("Failed to find Tweet"));
            }
        };
        
        match tweet.delete().await{
            Ok(_) => (),
            Err(_) => {
                return Err(Status::internal("Failed to delete Tweet"));
            }
        };
        
        return Ok(Response::new(DeleteTweetResponse{
            success: true,
        }));
    }

    async fn edit_tweet(&self, request: Request<EditTweetRequest>) -> Result<Response<EditTweetResponse>, Status> {
        let fields = request.get_ref();
        let (id, title, content, parent_id ) = (fields.tweet_id, &fields.title, &fields.content, fields.parent_id);
        
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };

        let mut tweet = match TweetModel::get_by_user_and_id(id, user.get_id()).await{
            Ok(t) => t,
            Err(_) => {
                return Err(Status::invalid_argument("Failed to find Tweet"));
            }
        };
        
        tweet.title = String::from(title);
        tweet.content = String::from(content);
        tweet.parent_id = parent_id;
        match tweet.update().await{
            Ok(_) => (),
            Err(_) => {
                return Err(Status::internal("failed to update")); 
            }
        };
        
        Ok(Response::new(EditTweetResponse{
            success: true
        }))
        
    }

    async fn get_tweet_by_user(&self, request: Request<GetTweetByUserRequest>) -> Result<Response<GetTweetResponse>, Status> {
        todo!()
    }

    async fn get_all_tweet(&self, request: Request<GetAllTweetRequest>) -> Result<Response<GetTweetResponse>, Status> {
        todo!()
    }
}