
use hyper::Body;
use std::pin::Pin;
use std::task::{Context, Poll};
use tower::Layer;
use hyper::{Response, StatusCode};
use hyper::service::Service;
use tonic::body::BoxBody;
#[derive(Debug, Clone)]
pub struct AuthMiddleware<S> {
    inner: S,
}

#[derive(Debug, Clone, Default)]
pub struct AuthLayer;

impl<S> Layer<S> for AuthLayer {
    type Service = AuthMiddleware<S>;

    fn layer(&self, service: S) -> Self::Service {
        AuthMiddleware { inner: service }
    }
}


type BoxFuture<'a, T> = Pin<Box<dyn std::future::Future<Output = T> + Send + 'a>>;

impl<S> Service<hyper::Request<Body>> for AuthMiddleware<S>
    where
        S: Service<hyper::Request<Body>, Response = hyper::Response<BoxBody>> + Clone + Send + 'static,
        S::Future: Send + 'static,
{
    type Response = S::Response;
    type Error = S::Error;
    type Future = BoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.inner.poll_ready(cx)
    }

    fn call(&mut self, req: hyper::Request<Body>) -> Self::Future {
        // This is necessary because tonic internally uses `tower::buffer::Buffer`.
        // See https://github.com/tower-rs/tower/issues/547#issuecomment-767629149
        // for details on why this is necessary
        let clone = self.inner.clone();
        let mut inner = std::mem::replace(&mut self.inner, clone);

        let route = req.uri().to_string();

        Box::pin(async move  {

            // let response = inner.call(req).await?;

            // return Ok(response)

            if(false){
                let response = inner.call(req).await?;

                return Ok(response)

            }else{
                let response = Response::builder()
                    .status(StatusCode::UNAUTHORIZED)
                    .body(tonic::body::empty_body())
                    .unwrap();
                return Ok(response);
            }

        })
    }
}