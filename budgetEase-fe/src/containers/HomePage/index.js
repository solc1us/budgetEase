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
              <h1>
                Mengapa budget<span style={{ color: "#F56363" }}>Ease</span>?
              </h1>
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
              <p className="gx-alt-title-testimoni">
                Cerita mereka tentang budget
                <span style={{ color: "#F56363" }}>Ease</span>
              </p>
              <div className="gx-app-home-testimoni-box-container">
                <div className="gx-app-home-testimoni-box-content">
                  <h2>Sasi</h2>
                  <p>
                    "Saya merasa sangat terbantu dengan budgetEase. Dengan fitur
                    pemantauan pengeluaran, saya dapat melihat dengan jelas pola
                    pengeluaran saya dan lebih mudah membuat anggaran.
                    budgetEase benar-benar memudahkan hidup saya dalam mengelola
                    keuangan secara lebih efisien."
                  </p>
                </div>
                <div className="gx-app-home-testimoni-box-content">
                  <h2>Bilal</h2>
                  <p>
                    "Sebagai pebisnis kecil, budgetEase memudahkan pencatatan
                    transaksi bisnis dan pemantauan arus kas. Saya dapat dengan
                    cepat mengakses laporan keuangan, membantu pengambilan
                    keputusan yang lebih cerdas untuk pertumbuhan bisnis saya."
                  </p>
                </div>
                <div className="gx-app-home-testimoni-box-content">
                  <h2>Fahira</h2>
                  <p>
                    "budgetEase membawa kemudahan dalam merencanakan keuangan
                    selama masa studi. Saya dapat dengan mudah melihat
                    pengeluaran, serta mengalokasikan dana untuk kebutuhan
                    akademik dan kehidupan sosial. Ini benar-benar membantu
                    menghindari kesusahan keuangan."
                  </p>
                </div>
              </div>
            </div>
            <div className="gx-app-home-footer">
              <div className="gx-app-home-footer-container">
                <div className="gx-app-home-footer-l">
                  <img src={budgetEaseLogoMain} height={80} />
                  <h1>budgetEase - PT Gemilang Keuangan Indonesia</h1>
                  <p>Perum Griya Alam Sentosa</p>
                  <p>
                    Jl. Griya Alam Sentosa, Blok R-23 No 9, RT 16 RW 10, Kel.
                    Pasirangin, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat
                    16820
                  </p>
                </div>
                <div className="gx-app-home-footer-r">
                  <h1>Bantuan</h1>
                  <p><Link to="/signin">Login</Link></p>
                  <p><Link to="/signup">Register</Link></p>
                  <p><Link>085888864526</Link></p>
                </div>
              </div>
            </div>
            <div className="gx-app-home-footer-c">
              <p>© 2024 budgetEase - PT Gemilang Keuangan Indonesia. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
