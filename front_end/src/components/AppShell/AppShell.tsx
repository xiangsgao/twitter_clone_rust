import { FC, ReactNode } from "react";
import { ConfigProvider } from "antd";
import { theme } from "../../theme/theme.ts";
import { UserContext } from "../context/UserServiceContext.tsx";

interface AppShellProps {
    children: ReactNode
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
    return (
        <ConfigProvider theme={theme}>
            <UserContext>
                {children}
            </UserContext>
        </ConfigProvider>
    )
}