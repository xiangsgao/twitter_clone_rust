mod services;
mod interceptors;
mod tower_layers;
mod database;
mod utils;

use std::error::Error;
use clap::Parser;
use dotenv::dotenv;
use tonic::transport::Server;
use tonic_middleware::RequestInterceptorLayer;
use crate::interceptors::auth_interceptor::{AuthInterceptor};
use crate::interceptors::auth_interceptor::service::AuthServiceImpl;
use crate::services::tweet::proto::tweet_server::TweetServer;
use crate::services::user::proto::user_server::UserServer;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// custom port
    #[arg(short, long, value_name = "8080")]
    port: Option<String>,
}


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // load .env
    dotenv().ok();
    let args = Args::parse();
    let port = args.port.unwrap_or(String::from("8080"));
    let addr = format!("[::1]:{port}").parse()?;

    let user_service = tonic_web::enable(UserServer::new(services::user::UserService::default()));
    let tweet_service = tonic_web::enable(TweetServer::new(services::tweet::TweetService::default()));



    // reflect doc for clients
    let user_reflection = tonic_reflection::server::Builder::configure()
        .register_encoded_file_descriptor_set(services::user::proto::FILE_DESCRIPTOR_SET)
        .build()?;

    // protect the authenticated routes
    let auth_interceptor = AuthInterceptor {
        auth_service: AuthServiceImpl::default(),
    };

    // The stack of middleware that our service will be wrapped in, not used atm
    // let towerLayer = tower::ServiceBuilder::new()
        //Apply our own middleware
        //.layer(auth_layer::AuthLayer::default())
        //Interceptors can be also be applied as middleware
        //.layer(tonic::service::interceptor(authenticate))
        //.into_inner();


    println!("Server listening on {port}");

    Server::builder()
        .accept_http1(true)
        //.layer(towerLayer)
        .layer(tower_http::cors::CorsLayer::permissive())
        .layer(RequestInterceptorLayer::new(auth_interceptor.clone()))
        .add_service(user_service)
        .add_service(tweet_service)
        .add_service(user_reflection)
        .serve(addr)
        .await?;


    Ok(())
}