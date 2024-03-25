use tonic::{Request, Response, Status};
use crate::services::user::proto::{LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse};
use crate::services::user::proto::user_server::User;

pub mod proto {
    tonic::include_proto!("twitter_clone");
    pub(crate) const FILE_DESCRIPTOR_SET: &[u8] = tonic::include_file_descriptor_set!("twitter_clone_descriptor");
}


#[derive(Debug, Default)]
pub struct UserService {

}


#[tonic::async_trait]
impl User for UserService{
    async fn login_user(&self, request: Request<LoginUserRequest>) -> Result<Response<LoginUserResponse>, Status> {
            let r = request.get_ref();
            Ok(Response::new(LoginUserResponse { success: true}))
    }

    async fn register_user(&self, request: Request<RegisterUserRequest>) -> Result<Response<RegisterUserResponse>, Status> {
            let r = request.get_ref();
            Ok(Response::new(RegisterUserResponse { success: true}))
    }
}