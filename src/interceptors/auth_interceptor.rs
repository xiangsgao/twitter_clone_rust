
use tonic::{Request, Status};

struct UserContext {
    user_id: String,
    email: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    active: bool
}

// Async interceptor fn
pub async fn authenticate(mut req: Request<()>) -> Result<Request<()>, Status> {
    // Inspect the gRPC metadata.
    // let auth_header_val = match req.metadata().get("x-my-auth-header") {
    //     Some(val) => val,
    //     None => return Err(Status::unauthenticated("Not authenticated")),
    // };

    // Insert an extension, which can be inspected by the service.
    //req.extensions_mut().insert(UserContext { user_id: "001".to_string(), email: "test@gmail.com".to_string(), first_name: "super".to_string(), last_name: "test".to_string(), screen_name: "super_test".to_string(), active: true });

    Ok(req)
}