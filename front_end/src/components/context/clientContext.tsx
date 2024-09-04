import { createContext, FC, ReactNode } from "react";
import React from "react";
import { ClientService } from "../../api/grpc/clientService";

const ClientServiceProvider = createContext<null | ClientService>(null);

interface ClientServiceContextProps {
    children: ReactNode
}

export const ClientServiceContext: FC<ClientServiceContextProps> = ({children}) =>{

    const  clientService = React.useMemo(() => new ClientService(), []);

    
    return (
        <ClientServiceProvider.Provider value={clientService}>
            {children}
        </ClientServiceProvider.Provider>
    )
}