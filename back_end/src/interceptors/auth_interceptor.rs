use tonic::{async_trait, Status};
use tonic::codegen::http::{Request};
use tonic::transport::{Body};
use tonic_middleware::{
  RequestInterceptor,
};
use url::Url;
use crate::interceptors::auth_interceptor::service::AuthService;

const PROTECTED_ROUTE: [&'static str; 0] = [
];

pub mod service{
    use std::env;
    use async_trait::async_trait;
    use jsonwebtoken::{decode, DecodingKey, Validation};
    use crate::database::models::{JwtClaims, TokenModel, UserModel};

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

            // for extra security, checks user id is the same as that in the decoded token
            let token = match decode::<JwtClaims>(&token, &DecodingKey::from_secret(env::var("JWT_SECRET").unwrap().as_bytes()), &Validation::default()){
              Ok(e) => e,
              Err(_) =>{
                 return Err("Failed to decode token".to_string())
              }
            };
            let claims = token.claims;
            if user.id != claims.user_id{
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
