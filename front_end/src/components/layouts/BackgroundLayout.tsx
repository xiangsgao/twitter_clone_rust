import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled(Layout)`
  height: 100vh;
  background: blue;
`

interface BackgroundLayoutProps {
    children?: ReactNode
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({children}) => {

  return (
    <StyledLayout>
        {children}
        <Outlet />
    </StyledLayout>
  );
};

export default BackgroundLayout;