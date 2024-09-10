import { createContext, FC, ReactNode, useContext } from "react";
import React from "react";
import { ClientContext } from "./clientProvider";
import UnreachableError from "../../utils/unreachableError";
import Status from "../../utils/grpcStatus";
import store from "store2";

interface UserState {
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    followers: number,
    following: number
}

interface AuthContext {
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    user: UserState | null
}

const Ctx = createContext<AuthContext | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) =>{

    const [user, setUser] = React.useState<UserState | null>(null);
    const grpcClient = useContext(ClientContext);

    if(!grpcClient){
        throw UnreachableError;
    }

    const value = React.useMemo(() =>  ({
        login: async (email: string, password: string) => {
            const res = await grpcClient.loginUser(email, password);
            if(res.status.code !== Status.OK){
                throw new Error("Login failed, please try this again");
            }
            const token = res.response.token;
            store.set("token", token);
            const getUserRes = await grpcClient.getUser();
            if(getUserRes.status.code !== Status.OK){
                throw new Error("Failed to get user");
            }
            const user = getUserRes.response;
            setUser(user);
            store.set("user", user);
        },
        logout: async () => {},
        user
    }), []);

    
    return (
        <Ctx.Provider value={value}>
            {children}
        </Ctx.Provider>
    )
}

export {Ctx as AuthContext}