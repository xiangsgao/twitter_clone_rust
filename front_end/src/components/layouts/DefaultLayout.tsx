import React, { ReactNode, useContext, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../providers/authProvider';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children?: ReactNode
}

const StyledLayout = styled(Layout) <{ colorBgContainer: string, borderRadiusLG: number }>`
  height: 100vh;
  .header{
    padding: 0;
    background: ${props => props.colorBgContainer};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content{
      margin: 24px 16px;
      padding: 24px;
      min-height: 280px;
      background: ${props => props.colorBgContainer};
      border-radius: ${props => props.borderRadiusLG};
  }
  .menu-btn{
      fontSize: 16px;
      width: 64px;
      height: 64px;
  }
`

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = useContext(AuthContext)?.user;

  return (
    <StyledLayout borderRadiusLG={borderRadiusLG} colorBgContainer={colorBgContainer}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className='header'>
          <Button
            className='menu-btn'
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          {user ?
            <Avatar />
            : <Button type='text'>Login</Button>
          }
        </Header>
        <Content className='content'>
          {children}
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  );
};

export default DefaultLayout;