import { FC, ReactNode } from "react";
import { ConfigProvider } from "antd";
import { theme } from "../../theme/theme.ts";
import { Provider } from "react-redux";
import { store } from "../../store/store.ts";
import { ClientServiceContext } from "../context/clientContext.tsx";

interface AppShellProps {
    children: ReactNode
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
    return (
        <ConfigProvider theme={theme}>
            <ClientServiceContext>
                <Provider store={store}>
                    {children}
                </Provider>
            </ClientServiceContext>
        </ConfigProvider>
    )
}