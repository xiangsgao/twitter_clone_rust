import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
    children?: ReactNode
}

const App: React.FC<LayoutProps> = ({children}) => {

  return (
    <Layout style={{ height : "100vh"}}>
        {children}
        <Outlet />
    </Layout>
  );
};

export default App;