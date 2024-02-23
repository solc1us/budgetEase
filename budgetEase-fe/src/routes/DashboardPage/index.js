import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Modal,
  Table,
  Switch,
  DatePicker,
  Space,
  Checkbox,
  Row,
  Col,
} from "antd";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const history = useHistory();

  const [cashflows, setCashflows] = useState([]);

  const [income, setIncome] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id
      },
    })
      .then(function (response) {
        console.log("dari useEffect", response.data.data);
        setCashflows(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const incomingCashflows = cashflows.filter(cashflow => cashflow.arus === 'i');

  const totalIncomingNominal = incomingCashflows.reduce((total, cashflow) => total + cashflow.nominal, 0);

  const outcomeCashflows = cashflows.filter(cashflow => cashflow.arus === 'o');

  const totalOutcomeNominal = outcomeCashflows.reduce((total, cashflow) => total + cashflow.nominal, 0);

  const totalDiff = (totalIncomingNominal - totalOutcomeNominal)

  const onClickButtonTesting = () => {
    console.log(cashflows)
    console.log("total incoming", totalIncomingNominal)
    console.log(totalDiff)
  }

  return (
    <div>
      <h1 className="gx-main-user-main-title">Dashboard</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pemasukan</h1>
            <p className="income">Rp {totalIncomingNominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Sisa Uang</h1>
            <p className="diff">Rp {totalDiff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pengeluaran</h1>
            <p className="outcome">Rp {totalOutcomeNominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          </div>
        </div>
      </div>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <h1> Analisis Pengeluaran Bulanan</h1>
        </div>
        <Button onClick={onClickButtonTesting}>
          Button Testing
        </Button>
      </div>
    </div>
  );
};

export default SamplePage;
