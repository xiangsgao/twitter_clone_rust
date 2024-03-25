use tonic::{async_trait, Status};
use tonic::codegen::http::{Request};
use tonic::transport::{Body};
use tonic_middleware::{
  RequestInterceptor,
};
use url::Url;
use crate::interceptors::auth_interceptor::service::AuthService;

const PROTECTED_ROUTE: [&'static str; 2] = [
    "/twitter_clone.User/LoginUser",
    "/twitter_clone.User/RegisterUser"
];

pub mod service{
    use async_trait::async_trait;
    use crate::database::models::UserModel;

    #[async_trait]
    pub trait AuthService: Send + Sync + 'static {
        async fn verify_user_token(&self, token: &str) -> Result<UserModel, String>;
    }

    #[derive(Default, Clone)]
    pub struct AuthServiceImpl;

    #[async_trait]
    impl AuthService for AuthServiceImpl {
        async fn verify_user_token(&self, token: &str) -> Result<UserModel, String> {
            let user = UserModel::fetch_from_token(token).await;

            if let Err(_) = &user{
                return Err("Unauthenticated".to_string());
            }
            return Ok(user.unwrap());
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
