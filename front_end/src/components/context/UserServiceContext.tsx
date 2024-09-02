import { createContext, FC, ReactNode } from "react";
import UserService from "../../api/grpc/userService";
import React from "react";

const UserServiceProvider = createContext<null | UserService>(null);

interface UserContextProps {
    children: ReactNode
}

export const UserContext: FC<UserContextProps> = ({children}) =>{

    const  userService = React.useMemo(() => new UserService(), []);

    
    return (
        <UserServiceProvider.Provider value={userService}>
            {children}
        </UserServiceProvider.Provider>
    )
}