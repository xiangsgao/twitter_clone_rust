import {UserClient} from "../../proto/twitter_clone_grpc_pb";
import {APP_URL} from "../../utils/constants.ts";
import {
    FollowRequest,
    GetUserRequest,
    LoginUserRequest,
    LoginUserResponse,
    LogoutUserRequest,
    LogoutUserResponse, UserResponse
} from "../../proto/twitter_clone_pb";


class UserService {
    private userClient;
    constructor() {
        this.userClient = new UserClient(APP_URL, null, null)
    }

    loginUser(email: string, password: string): Promise<LoginUserResponse>{
        const request: LoginUserRequest = new LoginUserRequest()
                .setEmail(email)
                .setPassword(password);

        return new Promise((resolve, reject) =>{
            this.userClient.loginUser(request, {}, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            });
        })
    }

    logoutUser(): Promise<LogoutUserResponse>{
        const request: LogoutUserRequest = new LogoutUserRequest();

        return new Promise((resolve, reject) =>{
            this.userClient.logoutUser(request, {}, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            });
        })
    }

    getUser(): Promise<UserResponse>{
        const request: GetUserRequest = new GetUserRequest();

        return new Promise((resolve, reject) =>{
            this.userClient.getUser(request, {}, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            });
        });
    }

    followUser(userId: number): Promise<UserResponse>{
        const request: FollowRequest = new FollowRequest().setUserId(userId);
        return new Promise((resolve, reject) =>{
            this.userClient.followUser(request, {}, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            });
        })
    }

    unfollowUser(userId: number): Promise<UserResponse>{
        const request: FollowRequest = new FollowRequest().setUserId(userId);
        return new Promise((resolve, reject) =>{
            this.userClient.unfollowUser(request, {}, (err, response) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            });
        })
    }


}



export default UserService