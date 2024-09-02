import { FC, ReactNode } from "react";
import { ConfigProvider } from "antd";
import { theme } from "../../theme/theme.ts";
import { UserServiceContext } from "../context/UserServiceContext.tsx";
import { TweetServiceContext } from "../context/TweetServiceContext.tsx";

interface AppShellProps {
    children: ReactNode
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
    return (
        <ConfigProvider theme={theme}>
            <UserServiceContext>
                <TweetServiceContext>
                    {children}
                </TweetServiceContext>
            </UserServiceContext>
        </ConfigProvider>
    )
}