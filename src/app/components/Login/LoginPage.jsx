import axios from "axios";
import "./Login.css";
import { Form, Input, Button, message } from "antd";

const LoginPage = ({ onLogin }) => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        {
          username: values.username,
          password: values.password,
        }
      );

      if (response.data.token) {
        const { token, username } = response.data;
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ token, username })
        );
        message.success("Logged in successfully");
        onLogin();
      } else {
        message.error("Login failed, please try again.");
      }
    } catch (error) {
      message.error("Invalid username or password");
    }
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
