use serde::{Deserialize, Serialize};
use tonic::{async_trait, Status};
use tonic::codegen::http::{Request};
use tonic::transport::{Body};
use tonic_middleware::{
  RequestInterceptor,
};
use url::Url;
use crate::interceptors::auth_interceptor::service::AuthService;

#[derive(Deserialize, Serialize, Debug)]
pub struct JwtClaims {
    pub user_id: i32
}


const PROTECTED_ROUTE: [&'static str; 4] = [
    "/twitter_clone.User/LogoutUser",
    "/twitter_clone.User/GetUser",
    "/twitter_clone.User/FollowUser",
    "/twitter_clone.User/UnfollowUser"
];

pub mod service{
    use std::collections::HashSet;
    use std::env;
    use async_trait::async_trait;
    use jsonwebtoken::{decode, DecodingKey, Validation};
    use crate::database::models::{TokenModel, UserModel};
    use crate::interceptors::auth_interceptor::JwtClaims;

    #[async_trait]
    pub trait AuthService: Send + Sync + 'static {
        async fn verify_user_token(&self, token: &str) -> Result<UserModel, String>;
    }

    #[derive(Default, Clone)]
    pub struct AuthServiceImpl;

    #[async_trait]
    impl AuthService for AuthServiceImpl {
        async fn verify_user_token(&self, token: &str) -> Result<UserModel, String> {

            let token_model = match TokenModel::get_by_token(token).await{
              Ok(e)=> e,
              Err(_) => {
                  return Err("Failed to find token".to_string());
              }
            };

            let user = match UserModel::fetch_from_token(&token_model.token).await{
                Ok(e)=> e,
                Err(_) => {
                    return Err("Failed to find user".to_string());
                }
            };

            let secret = env::var("JWT_SECRET").expect("can not find jwt secret in env");
            let final_key = &(secret.to_string() + &token_model.created_at.to_string())[0..secret.len() + 19];

            let mut validation = Validation::default();
            validation.validate_exp = false; // token never expired muahahahahahah
            validation.required_spec_claims = HashSet::new();
            // for extra security, checks user id is the same as that in the decoded token
            let token = match decode::<JwtClaims>(&token, &DecodingKey::from_secret(final_key.as_bytes()), &validation){
              Ok(e) => e,
              Err(_) =>{
                 return Err("Failed to decode token".to_string())
              }
            };
            let claims = token.claims;
            if user.get_id() != claims.user_id{
                return Err("What the fck? are you some hackers?".to_string());
            }

            return Ok(user);
        }
    }
}


#[derive(Clone)]
pub struct AuthInterceptor<A: AuthService> {
    pub auth_service: A,
}


impl <A: AuthService> AuthInterceptor<A>{
    fn is_protected_path (path: &str) -> bool{
        let binding = Url::parse(path).unwrap();
        let route = binding.path();
        PROTECTED_ROUTE.contains(&route)
    }
}



#[async_trait]
impl<A: AuthService> RequestInterceptor for AuthInterceptor<A> {
    async fn intercept(&self, mut req: Request<Body>) -> Result<Request<Body>, Status> {
        let is_protected = Self::is_protected_path(&req.uri().to_string());

        if !is_protected {
            return Ok(req);
        }

        match req.headers().get("authorization").map(|v| v.to_str()) {
            Some(Ok(token)) => {
                let user = self
                    .auth_service
                    .verify_user_token(token)
                    .await;

                if let Err(_) = &user{
                   return Err(Status::unauthenticated("Unauthenticated"))
                }

                req.extensions_mut().insert(user.unwrap());
                Ok(req)
            }
            _ => Err(Status::unauthenticated("Unauthenticated")),
        }
    }


}
