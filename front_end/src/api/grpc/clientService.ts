import { UserClient } from "../../proto/twitter_clone.client";
import { APP_URL } from "../../utils/constants";

export class ClientService {
    private client: UserClient;
    constructor(){
        this.client = new UserClient(APP_URL);
    }
}