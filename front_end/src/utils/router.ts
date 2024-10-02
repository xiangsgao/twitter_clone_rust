import { useNavigate } from "react-router-dom"

export const userRouter = () =>{
    const navigate = useNavigate();
    return {
        navigate
    }
}