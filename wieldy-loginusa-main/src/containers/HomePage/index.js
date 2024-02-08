import React, { useEffect } from "react";
import { Button, Checkbox, Form, Image, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import budgetEaseLogoMain from "../budgetEase-Logo-Main.png"

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
} from "../../appRedux/actions";

import AuthActions from "../../appRedux/reducers/AuthRedux";
import config from "../../util/config";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../../components/CircularProgress";

const Home = () => {
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
        <img src={budgetEaseLogoMain} width={100} />
        <div className="gx-app-login-main-content">
          <div className="gx-app-login-content">
            <h1 className="gx-app-login-h1">Home</h1>
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

export default Home;
