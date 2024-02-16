// a library to wrap and simplify api calls
import apisauce from "apisauce";
import config from "../util/config";
import { notification, Modal, Row, Col } from "antd";
import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { store } from "../NextApp";
import AuthActions from "../appRedux/reducers/AuthRedux";
// our "constructor"
const create = (baseURL = config.BASE_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      // 'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 50000 /* * 30 */, //di uncoment = 30 menit
  });

  api.addAsyncRequestTransform(async (request) => {
    // let session = await AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject()
    //const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
    // const session = await AsyncStorageHelper(StaticVar.REGISTER_TOKEN).getData(); @Deprecated
    const user_credent = JSON.parse(localStorage.getItem("user_credent"));
    const change_credent = JSON.parse(localStorage.getItem("change_credent"));

    // request.headers['AuthToken'] = idTokenResult
  });

  api.addResponseTransform(async (response) => {
    if (response.config.url === "main/login") {
      console.log("response", response)
      if (!response.ok && response.data) {
        Modal.warning({
          centered: true,
          icon: <ExclamationCircleFilled />,
          okType: "danger",
          content: (
            <div>
              <p>
              {response.data.message
                ? response.data.message
                : "Unknown Error From Backend (Code: 1)"}
            </p>
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
                <span>Warnings !</span>
              </Col>
            </Row>
          ),
          onOk() {},
          onCancel() {},
        });
        return;
      }
    }

    // if (response.config.url === "main/register") {
    //   console.log("response", response)
    //   if (response.ok && response.data) {
    //     Modal.success({
    //       centered: true,
    //       icon: <CheckCircleFilled />,
    //       okType: "Pemberitahuan !",
    //       content: (
    //         <div className="gx-text-dark">
    //           <p>{response.data.message}</p>
    //         </div>
    //       ),
    //       title: (
    //         <Row
    //           type="flex"
    //           justify="start"
    //           style={{ alignItems: "center" }}
    //           gutter={[5, 0]}
    //         >
    //           <Col>
    //             <span>Berhasil !</span>
    //           </Col>
    //         </Row>
    //       ),
    //       onOk() {},
    //       onCancel() {},
    //     });
    //     return;
    //   }
    // }

    if (!response.ok && response.data) {
      Modal.error({
        centered: true,
        icon: <ExclamationCircleFilled />,
        okType: "danger",
        content: (
          <div>
            <p>
              {response.data.message
                ? response.data.message
                : "Unknown Error From Backend (Code: 1)"}
            </p>
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
              <span>Warnings !</span>
            </Col>
          </Row>
        ),
        onOk() {},
        onCancel() {},
      });
      if (
        response.data &&
        response.data.message &&
        response.data.message ===
          "Full authentication is required to access this resource"
      ) {
        store.dispatch(AuthActions.userSignOut());
      }
    }

    if (
      !response.ok &&
      response.problem &&
      response.problem === "TIMEOUT_ERROR"
    ) {
      notification.error({
        message: "Error",
        description: "Gagal Terkoneksi ke server, harap periksa koneksi",
      });
    }

    if (
      !response.ok &&
      response.problem &&
      response.problem === "NETWORK_ERROR"
    ) {
      notification.error({
        message: "Error",
        description: "Tidak Dapat Terhubung ke Server",
      });
    }

    if (response.ok && response.data && response.data.error) {
      Modal.error({
        centered: true,
        icon: <ExclamationCircleFilled />,
        okType: "danger",
        content: (
          <div>
            <p>
              {response.data.message
                ? response.data.message
                : "Unknown Error From Backend (Code: 1)"}
            </p>
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
              <span>Warnings !</span>
            </Col>
          </Row>
        ),
        onOk() {},
        onCancel() {},
      });
      // notification.error({
      //   message: "Error",
      //   description: response.data.message
      //     ? response.data.message
      //     : "Unknown Error From Backend (Code: 2)",
      // });
    }
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const templateRequest = (data) => api.get("typicode/demo/comments", data);
  const getComment = (data) => api.get("typicode/demo/comments", data);

  // Auth
  const authRequest = (data) => api.post("main/login", data);
  const logoutRequest = (data) => api.post("auth/signout", data);
  const loginRequest = (data) => api.post("main/login", data);
  const register = (data) => api.post("main/register", data);
  const authForgotPasswordRequest = (data) =>
    api.post("auth/forgot-password", data);
  const authResetPasswordRequest = (data) =>
    api.post("auth/reset-password", data);

  const authChangePasswordRequest = (data) =>
    api.post("auth/change-password", data);

  //
  return {
    // a list of the API functions from step 2
    templateRequest,
    getComment,
    authRequest,
    logoutRequest,
    loginRequest,
    register,
    authForgotPasswordRequest,
    authResetPasswordRequest,
    authChangePasswordRequest,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
