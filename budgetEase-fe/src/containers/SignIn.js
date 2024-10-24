import React, { useEffect } from "react";
import { Button, Checkbox, Form, Image, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import budgetEaseLogoMain from "./budgetEase-Logo-Main.png";
import { hideMessage } from "../appRedux/actions";
import AuthActions from "../appRedux/reducers/AuthRedux";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);

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
  };

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-logo-content">
          <div className="gx-app-logo">
            <img alt="example" src={budgetEaseLogoMain} width={300} />
          </div>
        </div>
        <div className="gx-app-login-main-content">
          <div className="gx-app-login-content">
            <h1 className="gx-app-login-h1">Login</h1>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">
              <Form.Item
                initialValue=""
                rules={[{ required: true, message: "The input is not valid Username!" }]}
                name="username">
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                initialValue=""
                rules={[{ required: true, message: "Please input your Password!" }]}
                name="password">
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="gx-mb-0 gx-w-100"
                  htmlType="submit">
                  <IntlMessages id="app.userAuth.signIn" />
                </Button>
              </Form.Item>
              <Form.Item>
                <p className="gx-signin-switch-login-register">
                  Don't have an account?{" "}
                  <Link to="/signup">Register here!</Link></p>
              </Form.Item>
            </Form>
          </div>
          {loader ? (
            <div className="gx-loader-view"><CircularProgress/></div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
