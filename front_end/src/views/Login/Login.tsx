import { Form, Input, Modal } from "antd"

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};


const Login = () => {

    return (
        <div>
            <Modal open centered closeIcon={null} closable={false} cancelButtonProps={{ style: {display: "none"}}}>
                <Form>
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