use tonic::{Request, Response, Status};
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
        let tweet = Tweet
    }

    async fn delete_tweet(&self, request: Request<DeleteTweetRequest>) -> Result<Response<DeleteTweetResponse>, Status> {
        todo!()
    }

    async fn edit_tweet(&self, request: Request<EditTweetRequest>) -> Result<Response<EditTweetResponse>, Status> {
        todo!()
    }

    async fn get_tweet_by_user(&self, request: Request<GetTweetByUserRequest>) -> Result<Response<GetTweetResponse>, Status> {
        todo!()
    }

    async fn get_all_tweet(&self, request: Request<GetAllTweetRequest>) -> Result<Response<GetTweetResponse>, Status> {
        todo!()
    }
}