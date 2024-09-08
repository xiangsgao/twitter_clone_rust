import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

interface BackgroundLayoutProps {
    children?: ReactNode
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({children}) => {

  return (
    <Layout style={{ height : "100vh"}}>
        {children}
        <Outlet />
    </Layout>
  );
};

export default BackgroundLayout;