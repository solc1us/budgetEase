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

import moment from "moment";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const history = useHistory();

  const [cashflows, setCashflows] = useState([]);

  const [income, setIncome] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
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

  // Filter cashflows for incoming cashflows (arus === 'i') and current month
  const incomingCashflowsThisMonth = cashflows.filter((cashflow) => {
    const cashflowMonth = moment(cashflow.tanggal).month(); // Get the month of the cashflow
    const currentMonth = moment().month(); // Get the current month  
    return cashflowMonth === currentMonth && cashflow.arus === "i"; // Filter for current month and incoming
  });

  // Calculate total nominal for incoming cashflows this month
  const totalIncomingNominalThisMonth = incomingCashflowsThisMonth.reduce(
    (total, cashflow) => total + cashflow.nominal,
    0
  );

  // console.log(
  //   "Total Incoming Nominal for Current Month:",
  //   totalIncomingNominalThisMonth
  // );

  // Filter cashflows for outcoming cashflows (arus === 'o') and current month
  const outcomingCashflowsThisMonth = cashflows.filter((cashflow) => {
    const cashflowMonth = moment(cashflow.tanggal).month(); // Get the month of the cashflow
    const currentMonth = moment().month(); // Get the current month  
    return cashflowMonth === currentMonth && cashflow.arus === "o"; // Filter for current month and outcoming
  });

  // Calculate total nominal for outcoming cashflows this month
  const totalOutcomingNominalThisMonth = outcomingCashflowsThisMonth.reduce(
    (total, cashflow) => total + cashflow.nominal,
    0
  );

  const totalDiff = totalIncomingNominalThisMonth - totalOutcomingNominalThisMonth;

  const onClickButtonTesting = () => {
    console.log(cashflows);
    console.log("total incoming", totalIncomingNominalThisMonth );
    console.log(totalDiff);
  };

  const formatNumber = (number) => {
    // Convert number to string
    let str = number.toString();

    // Split the string into groups of 3 from the end
    const parts = [];
    while (str.length > 3) {
      parts.unshift(str.slice(-3)); // Add the last 3 characters to the start
      str = str.slice(0, -3); // Remove the last 3 characters
    }
    parts.unshift(str); // Add the remaining characters

    // Join the parts with dots and return
    return parts.join(".");
  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">Dashboard</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pemasukan</h1>
            <p className="income">Rp {formatNumber(totalIncomingNominalThisMonth )}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Sisa Uang</h1>
            <p className="diff">Rp {formatNumber(totalDiff)}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pengeluaran</h1>
            <p className="outcome">Rp {formatNumber(totalOutcomingNominalThisMonth)}</p>
          </div>
        </div>
      </div>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <h1> Analisis Pengeluaran Bulanan</h1>
        </div>
        {/* <Button onClick={onClickButtonTesting}>
          Button Testing
        </Button> */}
      </div>
    </div>
  );
};

export default SamplePage;
