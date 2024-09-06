import { createContext, FC, ReactNode } from "react";
import React from "react";

interface UserState {
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    followers: number,
    following: number
}

interface AuthContext {
    login: () => Promise<void>,
    logout: () => Promise<void>,
    user: UserState | null
}

const Ctx = createContext<AuthContext | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) =>{

    const [user, setUser] = React.useState<UserState | null>(null);

    const value = React.useMemo(() =>  ({
        login: async () => {},
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