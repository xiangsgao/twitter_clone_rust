
import { TweetClient } from "../../proto/twitter_clone_grpc_pb";
import { APP_URL } from "../../utils/constants";

class TweetService {
    private tweetClient;
    
    constructor(){
        this.tweetClient = new TweetClient(APP_URL, null, null)
    }
}

export default TweetService;