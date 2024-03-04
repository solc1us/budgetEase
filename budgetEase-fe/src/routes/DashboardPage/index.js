import React, { useState, useEffect, useRef } from "react";

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
  InputNumber,
} from "antd";

import moment from "moment";

import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const history = useHistory();

  const [cashflows, setCashflows] = useState([]);

  useEffect(() => {
    console.log("Fetching Cashflows...");
    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
      },
    })
      .then(function (response) {
        console.log("Fetched Cashflows:", response.data.data);
        setCashflows(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [user_credent.id]);

  const [maxMonthlyOutcome, setMaxMonthlyOutcome] = useState(null);

  useEffect(() => {
    console.log("Fetching Max Monthly Outcome...");
    axios({
      method: "get",
      url: "http://localhost:8080/mmo/find",
      params: {
        idUsers: user_credent.id,
        getLast: true,
      },
    })
      .then(function (response) {
        console.log("Fetched Max Monthly Outcome:", response.data.data);
        setMaxMonthlyOutcome(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, [user_credent.id]);

  console.log("Max Monthly Outcome:", maxMonthlyOutcome);

  // Filter cashflows for incoming cashflows (arus === 'i)
  const incomingCashflow = cashflows.filter((cashflow) => {
    return cashflow.arus === "i";
  });

  const totalIncomingNominal = incomingCashflow.reduce(
    (total, cashflow) => total + cashflow.nominal,
    0
  );

  // Filter cashflows for incoming cashflows (arus === 'i)
  const outcomingCashflow = cashflows.filter((cashflow) => {
    return cashflow.arus === "o";
  });

  const totalOutcomingNominal = outcomingCashflow.reduce(
    (total, cashflow) => total + cashflow.nominal,
    0
  );

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

  const totalDiff = totalIncomingNominal - totalOutcomingNominal;

  const onClickButtonTesting = () => {
    console.log("nominal", totalIncomingNominal);
    console.log("incoming cashflow", incomingCashflow);
  };

  const [nominal, setNominal] = useState(0); // State for the input value
  const [modalVisible, setModalVisible] = useState(false);

  const onClickEditButton = () => {
    setModalVisible(true);
  };

  const onFinishUpdateMmo = (values) => {
    // Handle the updatedNominal value

    axios({
      method: "post",
      url: "http://localhost:8080/mmo/create",
      data: {
        id_users: user_credent.id,
        nominal: values.nominal,
      },
    })
      .then(function (response) {
        console.log(response.data.data);
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const formatNumber = (value) => {
    // Convert value to string
    // let str = value.toString();

    // Split the string into groups of 3 from the end
    // const parts = [];
    // while (str.length > 3) {
    //   parts.unshift(str.slice(-3)); // Add the last 3 characters to the start
    //   str = str.slice(0, -3); // Remove the last 3 characters
    // }
    // parts.unshift(str); // Add the remaining characters

    // Join the parts with dots and return
    // return parts.join(".");

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">Dashboard</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pemasukan</h1>
            <p className="income">Rp {formatNumber(totalIncomingNominal)}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Sisa Uang</h1>
            <p className="diff">Rp {formatNumber(totalDiff)}</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pengeluaran</h1>
            <p className="outcome">
              Rp {formatNumber(totalOutcomingNominal)}
            </p>
          </div>
        </div>
      </div>
      <div className="gx-main-user-container gx-rounded-lg">
        <h1 style={{ textAlign: "center" }}> Analisis Pengeluaran Bulanan</h1>

        <div className="gx-dashboard-flex">
          <div className="gx-dashboard-boxed-content2 gx-rounded-base">
            <div className="gx-flex-row">
              <h1>Maks Pengeluaran</h1>
              <a onClick={onClickEditButton}>
                <img
                  src="assets\icons\pencil-square.svg"
                  style={{ padding: "0 0.2a5rem" }}
                />
              </a>
            </div>
            <p className="max">
              Rp
              {maxMonthlyOutcome?.nominal
                ? formatNumber(maxMonthlyOutcome.nominal)
                : ""}
            </p>
          </div>
          <div className="gx-dashboard-boxed-content2 gx-rounded-base">
            <h1>Pengeluaran</h1>
            <p className="outcome">
              Rp {formatNumber(totalOutcomingNominalThisMonth)}
            </p>
          </div>
          <div className="gx-dashboard-boxed-content2 gx-rounded-base">
            <h1>Sisa Pengeluaran</h1>
            <p className="remain">
              Rp
              {maxMonthlyOutcome?.nominal
                ? formatNumber(
                    maxMonthlyOutcome.nominal - totalOutcomingNominalThisMonth
                  )
                : ""}
            </p>
          </div>
        </div>
        {/* <Button onClick={onClickButtonTesting}>Button Testing</Button> */}
      </div>
      <Modal
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null} // Hide the default footer
        title="Edit Maksimal Pengeluaran Bulanan"
        icon={<QuestionCircleFilled />}
      >
        <Form onFinish={onFinishUpdateMmo} className="gx-px-4">
          <Form.Item
            label="Nominal"
            name="nominal"
            rules={[
              {
                required: true,
                message: "Please input the updated Nominal!",
              },
              {
                type: "number",
                min: 10000,
                message: "Input can't be less than 10000!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button className="gx-mb-0" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SamplePage;
