import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../components/providers/authProvider"
import UnreachableError from "../../utils/unreachableError"
import { Menu, MenuProps } from "antd"
import { LockOutlined, PoweroffOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import Info from "./content/Info"

const ProfileContainer = styled.div`
    .menu{
    }
`

type MenuOnClick =  React.ComponentProps<typeof Menu>["onClick"]
type MenuItem = Required<MenuProps>['items'][number];
const menuItems:  MenuItem[] = [
    {
      key: 'info',
      icon: <UserOutlined />,
      label: 'User Info',
     
    },
    {
      key: 'followers',
      icon: <UsergroupAddOutlined />,
      label: 'Followers',
     
    },
    {
      key: 'password',
      icon: <LockOutlined />,
      label: 'Password',
     
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <PoweroffOutlined />,
    },
  ];
   

const Profile: React.FC = () =>{
    const params = useParams<{tab: string}>();

    const defaultTab = params.tab ?? "info";

    const onClick: MenuOnClick = ({key}) =>{
      
    }
    
    return (
        <ProfileContainer>
            <Menu onClick={onClick} defaultSelectedKeys={[defaultTab]} className="menu" mode="vertical" items={menuItems} />
            <Info />
        </ProfileContainer>
    )
} 


export default Profile;