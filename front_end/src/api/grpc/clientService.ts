import { UserClient } from "../../proto/Twitter_cloneServiceClientPb";
import { APP_URL } from "../../utils/constants";

export class ClientService {
    private client: UserClient;
    constructor(){
        // this.client = new UserClient(APP_URL);
    }
}