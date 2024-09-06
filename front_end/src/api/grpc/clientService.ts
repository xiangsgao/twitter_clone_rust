import { LoginUserRequest, RegisterUserRequest } from "../../proto/twitter_clone";
import { UserClient } from "../../proto/twitter_clone.client";
import { APP_URL } from "../../utils/constants";

export class ClientService {
    private userClient: UserClient;
    constructor(){
        this.userClient = new UserClient(APP_URL);
    }


    loginUser(email: string, password: string){
        const loginUserRequest: LoginUserRequest = {
            email,
            password
        };
        return this.userClient.loginUser(loginUserRequest);
    }

    logoutUser(){
        return this.userClient.logoutUser({});
    }

    getUser(){
        return this.userClient.getUser({});
    }

    registerUser(email: string, password: string, firstName: string, lastName: string){
        const registerUserRequest: RegisterUserRequest = {
            email,
            password,
            firstName,
            lastName
        }
        return this.userClient.registerUser(registerUserRequest);
      
    }
}