import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn,
} from "../appRedux/actions";

import AuthActions from "../appRedux/reducers/AuthRedux";

import IntlMessages from "util/IntlMessages";
import { message } from "antd/lib/index";
import CircularProgress from "../components/CircularProgress";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";

const FormItem = Form.Item;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loader, alertMessage, showMessage, authUser } = useSelector(
    ({ auth }) => auth
  );

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      history.push("/");
    }
  });

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    console.log(values)

    dispatch(showAuthLoader());
    dispatch(AuthActions.registerUserRequest(values));
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = (_, value, promise) => {
    if (value && value !== password) {
      promise("Passwords do not match");
    } else {
      promise();
    }
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-logo-content">
          <div className="gx-app-logo-content-bg">
            <img src={"https://via.placeholder.com/272x395"} alt="Neature" />
          </div>
          <div className="gx-app-logo">
            <img alt="example" src="/assets/images/logo.png" />
          </div>
        </div>
        <div className="gx-app-login-main-content">
          <div className="gx-app-login-content">
            <h1 className="gx-app-login-h1">Register</h1>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <FormItem
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                name="username"
              >
                <Input placeholder="Username" />
              </FormItem>

              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </FormItem>
              <FormItem
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </FormItem>
              <FormItem
                name="confirm-password"
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                  { validator: validateConfirmPassword },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
              </FormItem>
              <Form.Item>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp" />
                </Button>
              </Form.Item>
              <Form.Item>
                <p className="gx-signin-switch-login-register">Already have an account? <Link to="/signin">Login here!</Link></p>
              </Form.Item>
              
            </Form>
          </div>
          {loader && (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && message.error(alertMessage)}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
