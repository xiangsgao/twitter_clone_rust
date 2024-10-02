import {Card} from "antd";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../components/providers/authProvider";

const StyledDiv = styled.div`

`
const Home = () =>{


    const user = useContext(AuthContext)?.user;

    return (
        <StyledDiv>
            <Card>
            </Card>        
        </StyledDiv>
    )
}

export default Home;