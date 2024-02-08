import React, { useEffect } from "react";
import { Button, Checkbox, Form, Image, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import budgetEaseLogoMain from "../budgetEase-Logo-Main.png";
import budgetEaseLogoWhite from "../budgetEase-Logo-White.png";

import { hideMessage } from "../../appRedux/actions";

import AuthActions from "../../appRedux/reducers/AuthRedux";
import config from "../../util/config";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../../components/CircularProgress";
import Header from "./Header";

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

  return (
    <div className="ant-layout gx-app-layout">
      <div className="ant-layout">
        <div className="ant-layout-content gx-layout-content">
          <div className="gx-app-home-wrap">
            <Header></Header>
            <div className="gx-app-home-welcome">
              <p>Welcome aboard,</p>
              <img src={budgetEaseLogoMain} height={88} className="gx-mb-5" />
            </div>
            <div className="gx-app-home-box-container">
              <div className="gx-app-home-box-main-content">
                <div className="gx-app-home-box-content">
                  <p>
                    budget<span style={{ color: "#F56363" }}>Ease</span> adalah
                    solusi finansial yang memudahkan pengguna untuk mengelola
                    keuangan pribadinya dengan baik sehingga menciptakan arus
                    keuangan yang transparan.
                  </p>
                </div>
              </div>
            </div>
            <div className="gx-app-home-mengapa">
              <h1>Mengapa budgetEase?</h1>
              <div className="gx-app-home-mengapa-list">
                <p>1. Mengendalikan uang yang dimiliki</p>
                <p>2. Fokus pada tujuan keuangan</p>
                <p>3. Menghemat biaya tak terduga</p>
                <p>4. Menekan pengeluaran</p>
                <p>5. Meminimalisir dan mencegah hutang</p>
              </div>
            </div>
            <div className="gx-app-home-testimoni">
              <h1>Apa kata mereka?</h1>
              <p>Cerita mereka tentang budgetEase</p>
              <div className="">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
