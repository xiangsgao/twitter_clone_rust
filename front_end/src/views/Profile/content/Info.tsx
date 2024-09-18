import { Form, Input } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../components/providers/authProvider";
import UnreachableError from "../../../utils/unreachableError";


const Info = () => {

    const user = useContext(AuthContext)?.user;
    if(!user){
        throw UnreachableError;
    }

    return (
        <Form initialValues={{firstName: user.firstName, lastName: user.lastName, email: user.email}}>
            <Form.Item  label={"First Name"} name={"firstName"}>
                <Input />
            </Form.Item>
            <Form.Item label={"Last Name"} name={"lastName"}>
                <Input />
            </Form.Item>
            <Form.Item label={"Email"} name={"email"}>
                <Input />
            </Form.Item>
            <Form.Item label={"Password"} name={"password"}>
                <Input.Password />
            </Form.Item>
            <Form.Item label={"Confirm Password"} name={"confirmPassword"}>
                <Input.Password />
            </Form.Item>
        </Form>
    )
}


export default Info;