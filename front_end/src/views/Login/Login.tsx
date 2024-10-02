import { Form, Input, Modal, notification } from "antd"
import { useContext } from "react";
import { AuthContext } from "../../components/providers/authProvider";
import UnreachableError from "../../utils/unreachableError";
import { userRouter } from "../../utils/router";

type FieldType = {
    email?: string;
    password?: string;
};


const Login = () => {
    const login = useContext(AuthContext)?.login;
    const {navigate} = userRouter();
    if(!login){
        throw new UnreachableError("Not possible");
    }
    const onSubmit = async (values: Required<FieldType>) =>{
        try{
            await login(values.email, values.password);
            navigate("/");
        }catch(err){
            notification.open({
                message: 'Error',
                type: "error",
                description:
                  'Failed to login, please recheck your credentials.',
              });
        }
    }

    return (
        <div>
            <Modal open centered closeIcon={null} closable={false} cancelButtonProps={{ style: { display: "none" } }}>
                <Form
                    onFinish={onSubmit}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Login;