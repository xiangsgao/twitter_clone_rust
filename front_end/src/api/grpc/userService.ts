import {UserClient} from "../../proto/twitter_clone_grpc_pb";
import {APP_URL} from "../../utils/constants.ts";
import {LoginUserRequest, LoginUserResponse} from "../../proto/twitter_clone_pb";


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

    logoutUser(email: string, password: string): Promise<LoginUserResponse>{
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

    getUser(email: string, password: string): Promise<LoginUserResponse>{
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


}



export default UserService