import { createContext, FC, ReactNode } from "react";
import TweetService from "../../api/grpc/TweetService";
import React from "react";

const TweetServiceProvider = createContext<null | TweetService>(null);

interface TweetServiceContextProps {
    children: ReactNode
}

export const TweetServiceContext: FC<TweetServiceContextProps> = ({children}) =>{

    const  tweetService = React.useMemo(() => new TweetService(), []);

    
    return (
        <TweetServiceProvider.Provider value={tweetService}>
            {children}
        </TweetServiceProvider.Provider>
    )
}