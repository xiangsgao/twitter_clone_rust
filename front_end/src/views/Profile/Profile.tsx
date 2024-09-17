import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../components/providers/authProvider"
import UnreachableError from "../../utils/unreachableError"
import { Menu, MenuProps } from "antd"
import { LockOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"

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
    const params = useParams<{tab: string}>();
    
    if(!user){
        throw UnreachableError;
    }


    const defaultTab = params.tab ?? "info";

    const onClick: MenuOnClick = ({key}) =>{
      
    }
    
    return (
        <ProfileContainer>
            <Menu onClick={onClick} defaultSelectedKeys={[defaultTab]} className="menu" mode="vertical" items={menuItems} />
        </ProfileContainer>
    )
} 


export default Profile;