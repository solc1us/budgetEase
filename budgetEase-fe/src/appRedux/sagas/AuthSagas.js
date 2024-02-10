import { call, put } from "redux-saga/effects";
import AuthActions from "../reducers/AuthRedux";

import LoadingOverlayActions from "../reducers/LoadingOverlayRedux";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Row, Col } from "antd";
import moment from "moment";
// import { auth } from "../../firebase/firebase";
// import { TemplateSelectors } from '../Redux/TemplateRedux'

// const signInUserWithEmailPasswordRequest = async (email, password) =>
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then((authUser) => authUser)
//     .catch((error) => error);

// const signOutRequest = async () =>
//   await auth
//     .signOut()
//     .then((authUser) => authUser)
//     .catch((error) => error);
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export function* signinUser(api, action) {
  const { user, history } = action;
  // console.log("USER TERPASSINFG ???", user);
  const { username, password } = user;

  const dummyData = {name: 'test'}
  localStorage.setItem("user_credent",JSON.stringify(dummyData))
  yield put(AuthActions.signinUserSuccess(dummyData))

  try {
    const signInUserResponse = yield call(api.authRequest, {
      username: username,
      password: password,
    });

    // console.log("signInUserResponse", signInUserResponse.data);
    // // console.log("signin true ?", signInUserResponse.ok);

    if (signInUserResponse.ok === true) {
      yield put(
        AuthActions.signinSuccess(signInUserResponse.data.data)
      );
      localStorage.setItem(
        "user_credent",
        JSON.stringify(signInUserResponse.data.data)
      );

      history.push("/");
    } else if (signInUserResponse.ok === false) {
      console.log(signInUserResponse.data.data.message + "asdasd");
      console.log("asdas")
      history.push("main/login")
    }
  } catch (error) {
    console.log(error);
  }
  
}

export function* registerUserRequest(api, action) {
  const { user, history } = action;
  const { username, password, no_hp, email } = user;

  try {
    const responses = yield call(api.register, {
      username,
      password,
      no_hp,
      email,
    });

    if (responses.ok === true) {
      // // console.log("e dari server register ", responses);

      yield put(AuthActions.registerUserSuccess(responses.data.data));
      history.push("/sigin")
      Modal.success({
        centered: true,
        icon: <CheckCircleFilled />,
        okType: "Pemberitahuan !",
        content: (
          <div className="gx-text-dark">
            <p>{responses.data.message}</p>
          </div>
        ),
        title: (
          <Row
            type="flex"
            justify="start"
            style={{ alignItems: "center" }}
            gutter={[5, 0]}
          >
            <Col>
              <span>Berhasil !</span>
            </Col>
          </Row>
        ),
        onOk() {},
        onCancel() {},
      });
    } else {
      yield put(AuthActions.showAuthLoader(false));
    }
  } catch (error) {
    // console.log(error);
  }
}

export function* loginUserRequest(api, action) {
  const { user, history } = action;
  // console.log("USER TERPASSINFG ???", user);
  const { username, password } = user;

  // const dummyData = {name: 'test'}
  // localStorage.setItem("user_credent",JSON.stringify(dummyData))
  // yield put(AuthActions.signinUserSuccess(dummyData))

  try {
    const signInUserResponse = yield call(api.loginRequest, {
      username,
      password,
    });

    // console.log("signInUserResponse", signInUserResponse);

    if (signInUserResponse.ok) {
      localStorage.setItem(
        "user_credent",
        JSON.stringify(signInUserResponse.data.data)
      );
      yield put(AuthActions.loginUserSuccess(signInUserResponse.data.data));
    } else {
      console.log("signInUserResponse", signInUserResponse.data.message);
      yield put(AuthActions.showAuthLoader(false));
    }
  } catch (error) {
    yield put(AuthActions.showAuthMessage(error));
  }
  
}

export function* userSignOut(api, action) {
  const { message } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Logging off ..."));
  try {
    // const signOutResponse = yield call(api.logoutRequest);
    // console.log("signOutResponse", signOutResponse);

    localStorage.removeItem("user_credent");
    yield put(AuthActions.userSignOutSuccess(""));
    // } else {
    //   yield put(AuthActions.showAuthMessage(signOutUser.message));
    // }
  } catch (error) {
    yield put(AuthActions.showAuthMessage(error));
    yield put(LoadingOverlayActions.showLoadingOverlay(false));
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authForgotPasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authForgotPasswordRequest, data);
  console.log("authForgotPasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authForgotPasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authForgotPasswordFailure());
    }
  } else {
    yield put(AuthActions.authForgotPasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authResetPasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authResetPasswordRequest, data);
  console.log("authResetPasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authResetPasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authResetPasswordFailure());
    }
  } else {
    yield put(AuthActions.authResetPasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authChangePasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authChangePasswordRequest, data);
  console.log("authChangePasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authChangePasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authChangePasswordFailure());
    }
  } else {
    yield put(AuthActions.authChangePasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}
