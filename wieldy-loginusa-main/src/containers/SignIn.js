import React, { useEffect } from "react";
import { Button, Checkbox, Form, Image, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
} from "../appRedux/actions";

import AuthActions from "../appRedux/reducers/AuthRedux";
import config from "../util/config";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(
    ({ auth }) => auth
  );
  const history = useHistory();

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
    dispatch(AuthActions.loginUserRequest(values));
    // dispatch(showAuthLoader());
    // dispatch(userSignIn(values));
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <img src={"https://imgur.com/rzn7ZbK"} width={100} />
        <div className="gx-app-login-main-content">
          <div className="gx-app-login-content">
            <h1 className="gx-app-login-h1">Login</h1>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "The input is not valid Username!",
                  },
                ]}
                name="username"
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                initialValue=""
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <p className="gx-signin-switch-login-register">Don't have an account? <Link to="/signup">Register here!</Link></p>
              </Form.Item>
            </Form>
          </div>

          {loader ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
