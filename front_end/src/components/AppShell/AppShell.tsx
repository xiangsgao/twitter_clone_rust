import { FC, ReactNode } from "react";
import { ConfigProvider } from "antd";
import { theme } from "../../theme/theme.ts";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../store/store.ts";
import { ClientProvider } from "../providers/clientProvider.tsx";
import { AuthProvider } from "../providers/authProvider.tsx";

interface AppShellProps {
    children: ReactNode
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
    return (
        <ConfigProvider theme={theme}>
            <ClientProvider>
                <AuthProvider>
                    <ReduxProvider store={store}>
                        {children}
                    </ReduxProvider>
                </AuthProvider>
            </ClientProvider>
        </ConfigProvider>
    )
}