import React, { useReducer, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import loginPic from "../../images/login.png";
const App = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    var username = values.username;
    var password = values.password;
    if (username == "" || password == "") {
      alert("Please fill in username or password!");
      return false;
    }
    var data = {
      username: username, //099998888
      password: password, //"123456"
    };
    if (data.username !== "Nasa" || data.password !== "330106") {
      alert("Username or Password is wrong");
      return false;
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "50px",
      }}
    >
      <div>
        <img src={loginPic} />
      </div>
      <div
        style={{
          width: 500,
          margin: "auto",
          marginTop: 100,
          backgroundColor: "rgb(203, 250, 255)",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Form name="normal_login" onFinish={onFinish}>
          <h1>Login</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a href="">Forgot password</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;
