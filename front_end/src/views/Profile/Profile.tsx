import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../components/providers/authProvider"
import UnreachableError from "../../utils/unreachableError"
import { Menu, MenuProps } from "antd"
import { LockOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons"

const ProfileContainer = styled.div`
    .menu{
    }
`
type MenuItem = Required<MenuProps>['items'][number];
const menuItems:  MenuItem[] = [
    {
      key: 'info',
      icon: <UserOutlined />,
      label: 'User Info',
     
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
    const user = useContext(AuthContext)?.user;

    if(!user){
        throw UnreachableError;
    }
    
    return (
        <ProfileContainer>
            <Menu className="menu" mode="vertical" items={menuItems} />
        </ProfileContainer>
    )
} 


export default Profile;