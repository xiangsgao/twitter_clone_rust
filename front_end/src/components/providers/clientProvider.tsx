import { createContext, FC, ReactNode } from "react";
import React from "react";
import { ClientService } from "../../api/grpc/clientService";

const Ctx = createContext<null | ClientService>(null);

interface ClientProviderContextProps {
    children: ReactNode
}

export const ClientProvider: FC<ClientProviderContextProps> = ({children}) =>{

    const  clientService = React.useMemo(() => new ClientService(), []);

    
    return (
        <Ctx.Provider value={clientService}>
            {children}
        </Ctx.Provider>
    )
}

export {Ctx as ClientContext};