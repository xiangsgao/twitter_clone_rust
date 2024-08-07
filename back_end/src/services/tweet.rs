use tonic::{IntoRequest, Request, Response, Status};
use crate::database::models::{CommentModel, DatabaseModel, LikeModel, TweetModel, UserModel};
use crate::services::tweet::proto::{CreateTweetCommentRequest, CreateTweetCommentResponse, CreateTweetRequest, CreateTweetResponse, DeleteTweetCommentRequest, DeleteTweetCommentResponse, DeleteTweetRequest, DeleteTweetResponse, EditTweetRequest, EditTweetResponse, GetAllTweetRequest, GetTweetCommentsResponse, GetTweetResponse, LikeTweetCommentRequest, LikeTweetCommentResponse, LikeTweetRequest, UnlikeTweetRequest};
use crate::services::tweet::proto::tweet_server::Tweet;
use crate::services::tweet::proto::TweetRecord;
use crate::services::tweet::proto::LikeTweetResponse;
use crate::services::tweet::proto::UnlikeTweetResponse;
use crate::services::tweet::proto::GetLoginTweetRequest;
use crate::services::tweet::proto::GetTweetCommentRequest;

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

    async fn get_login_tweet(&self, request: Request<GetLoginTweetRequest>) -> Result<Response<GetTweetResponse>, Status> {
        let fields = request.get_ref();
        let (page, limit) = (fields.page, fields.limit);
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        
        let (tweets, total) = match TweetModel::get_login_user_tweets(user.get_id(), page, limit).await{
            Ok(tweets) => tweets,
            Err(err) =>{
                return Err(Status::internal(err.to_string()));
            }
        };

        let tweets: Vec<TweetRecord> = TweetModel::to_tweet_records(tweets);

        Ok(Response::new(GetTweetResponse{
            tweets,
            page,
            limit,
            total
        })) 
    }

    async fn get_all_tweet(&self, request: Request<GetAllTweetRequest>) -> Result<Response<GetTweetResponse>, Status> {
        let fields = request.get_ref();
        let (page, limit) = (fields.page, fields.limit);
        let (tweets, total) = match TweetModel::get_all_tweets(page, limit).await{
            Ok(tweets) => tweets,
            Err(_) =>{
                return Err(Status::internal("failed to get tweets"));
            }
        };
        let tweets: Vec<TweetRecord> = TweetModel::to_tweet_records(tweets);

        Ok(Response::new(GetTweetResponse{
            tweets,
            page,
            limit,
            total
        }))

    }

    async fn like_tweet(&self, request: Request<LikeTweetRequest>)-> Result<Response<LikeTweetResponse>, Status>{
        let tweet_id = request.get_ref().tweet_id;
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        match LikeModel::create_new(user.get_id(), Some(tweet_id), None).await{
            Err(_) =>{
                return Err(Status::internal("failed to create like")); 
            }
            _ => ()
        }
        
        Ok(Response::new(LikeTweetResponse{
            success: true
        }))
    }

    async fn unlike_tweet(&self, request: Request<UnlikeTweetRequest>)-> Result<Response<UnlikeTweetResponse>, Status>{
        let tweet_id = request.get_ref().tweet_id;
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        let record = match LikeModel::find_from_ids(user.get_id(), Some(tweet_id), None).await{
            Ok(e) => e,
            Err(_) =>{
                return Err(Status::invalid_argument("failed to find like"));
            }
           
        };
        
        match record.update().await{
            Ok(_) => (),
            Err(_) =>{
                return Err(Status::internal("failed to delete like"));
            }
        };

        Ok(Response::new(UnlikeTweetResponse{
            success: true
        }))
    }

    async fn get_tweet_comments(&self, request: Request<GetTweetCommentRequest>)-> Result<Response<GetTweetCommentsResponse>, Status>{
        
        let fields = request.get_ref();
        let (tweet_id, page, limit) = (fields.tweet_id, fields.limit, fields.page);
        let (records, total) = match CommentModel::get_by_tweet_id(tweet_id, page, limit).await{
            Ok(e) => e,
            Err(_) => {
                return Err(Status::internal("failed to get comments"));
            }
        };
        
        let converted = CommentModel::to_comment_records(records);
        Ok(Response::new(GetTweetCommentsResponse{
            comments: converted,
            page,
            limit,
            total,
        }))
    }

    async fn create_tweet_comment(&self, request: Request<CreateTweetCommentRequest>) -> Result<Response<CreateTweetCommentResponse>, Status> {
        let fields = request.get_ref();
        let (tweet_id, content) = (fields.tweet_id, &fields.content);
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        match CommentModel::create_new(user.get_id(), content, tweet_id).await{
            Ok(_) => (),
            Err(_) =>{
                return Err(Status::internal("failed to create tweet"));
            }
        }
        
        Ok(Response::new(
            CreateTweetCommentResponse{
                success: true
            }
        ))
        
    }

    async fn delete_tweet_comment(&self, request: Request<DeleteTweetCommentRequest>) -> Result<Response<DeleteTweetCommentResponse>, Status> {
        let comment_id = request.get_ref().comment_id;
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };

        let comment_model = match CommentModel::get_by_id(comment_id, Some(user.get_id())).await{
            Ok(e) => e,
            Err(_) => return Err(Status::internal("comment not found")),
        };

        match comment_model.delete().await{
            Err(_) => return Err(Status::internal("failed to delete comment")),
            Ok(_) => ()
        };

        Ok(Response::new(DeleteTweetCommentResponse{
            success: true,
        }))

    }

    async fn like_tweet_comment(&self, request: Request<LikeTweetCommentRequest>) -> Result<Response<LikeTweetCommentResponse>, Status> {
        let fields = request.get_ref();
        let comment_id = fields.comment_id;
        let user: &UserModel = match request.extensions().get::<UserModel>(){
            Some(e) => e,
            None => {
                return Err(Status::unauthenticated("user not found")); // shouldn't happen, should be caught by the interceptor
            }
        };
        match LikeModel::create_new(user.get_id(), None, Some(comment_id)).await{
            Ok(_) => (),
            Err(_) => {
                return Err(Status::internal("Can not create comment"));
            }
        }
        
        Ok(Response::new(LikeTweetCommentResponse{
            success: true
        }))
    }
    
    
}