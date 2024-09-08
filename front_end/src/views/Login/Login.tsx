import { Form, Input, Modal } from "antd"

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const Login = () => {

    return (
        <div>
            <Modal open centered closeIcon={null} closable={false} cancelButtonProps={{ style: {display: "none"}}}>
                <Form>
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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