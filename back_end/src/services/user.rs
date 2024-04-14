use tonic::{Request, Response, Status};
use crate::database::models::{TokenModel, UserModel};
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
            let (email, password) = (&r.email, &r.password);
            let user_res = UserModel::get_by_email_and_password(email, password).await;
            if let Err(_) = &user_res{
                return Err(Status::unauthenticated("check if you have the right credentials"));
            }
        
            let user_model = user_res.unwrap();
            
            let token = match TokenModel::get_by_user_id(user_model.id).await{
                Ok(e) => e,
                Err(_) => match TokenModel::create_token(user_model.id).await { 
                    Ok(e) => e,
                    Err(_) => {
                        return Err(Status::internal("failed to create jwt token"));
                    }
                }
            };
            
            Ok(Response::new(LoginUserResponse { success: true, token: token.token}))
    }

    async fn register_user(&self, request: Request<RegisterUserRequest>) -> Result<Response<RegisterUserResponse>, Status> {
            let r = request.get_ref();
            let ( email, last_name, first_name, password) = (
                &r.email,
                &r.last_name,
                &r.first_name,
                &r.password
            );

            let result = UserModel::create_new_user(email,password, first_name, last_name).await;
            if let Err(error) = &result{
                // actually, this might be user error if like say the user already exists but we dont care for now
                return Err(Status::internal("Failed to register user"))
            }
            Ok(Response::new(RegisterUserResponse { success: true}))
    }
}