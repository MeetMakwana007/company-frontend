import "./Login.css";
import { Form, Input, Button } from "antd";

const LoginPage = ({ onLogin }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    onLogin();
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username (test@mail.com)" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password (1234)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
