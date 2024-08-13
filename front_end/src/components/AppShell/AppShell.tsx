import {FC, ReactNode} from "react";
import {ConfigProvider} from "antd";
import {theme} from "../../theme/theme.ts";

interface AppShellProps {
    children: ReactNode
}

export const AppShell: FC<AppShellProps> = ({children}) =>{
    return (
        <ConfigProvider theme={theme}>
            {children}
        </ConfigProvider>
    )
}