import React, { useState, useEffect } from "react";

import ExpenseChart from "./Chart/ExpenseChart";
import { Button } from "antd";
import axios from "axios";
import moment from "moment";

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const [initialCashflow, setInitialCashflow] = useState([]);

  const [incomingCashflow, setIncomingCashflow] = useState([]);

  const [outcomingCashflow, setOutcomingCashflow] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
      },
    })
      .then(function (response) {
        // console.log("dari useEffect", response.data.data);
        setInitialCashflow(response.data.data);

        const cashflowWithMoment = response.data.data.map((item) => ({
          ...item,
          date: moment(item.tanggal, "YYYY-MM-DD"), // Assuming date format is 'YYYY-MM-DD'
        }));

        // Filter cashflows for incoming cashflows (arus === 'i') and current year
        const incomingCashflowThisYear = cashflowWithMoment.filter((cashflow) => {
          const cashflowYear = moment(cashflow.tanggal).year(); // Get the year of the cashflow
          const currentYear = moment().year(); // Get the current year
          return cashflowYear === currentYear && cashflow.arus === "i"; // Filter for current year and incoming
        });

        // console.log("incoming", incomingCashflowThisYear);
        setIncomingCashflow(incomingCashflowThisYear);

        // Filter cashflows for outcoming cashflows (arus === 'o') and current year
        const outcomingCashflowThisYear = cashflowWithMoment.filter((cashflow) => {
          const cashflowYear = moment(cashflow.tanggal).year(); // Get the year of the cashflow
          const currentYear = moment().year(); // Get the current year
          return cashflowYear === currentYear && cashflow.arus === "o"; // Filter for current year and outcoming
        });

        setOutcomingCashflow(outcomingCashflowThisYear);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const onClickButtonTesting = () => {
    console.log("initial cashflow", initialCashflow);
    console.log("incomingCashflow", incomingCashflow);
    console.log("outcomingCashflow", outcomingCashflow);
  };

  const chartDataPointsI = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  const chartDataPointsO = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const cashflow of incomingCashflow) {
    const cashflowMonth = cashflow.date._d.getMonth(); // starting at 0 => Jan = 0
    chartDataPointsI[cashflowMonth].value += cashflow.nominal;
  }

  for (const cashflow of outcomingCashflow) {
    const cashflowMonth = cashflow.date._d.getMonth(); // starting at 0 => Jan = 0
    chartDataPointsO[cashflowMonth].value += cashflow.nominal;
  }

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

  const [isHideI, setIsHideI] = useState(true);
  const [isHideO, setIsHideO] = useState(true);

  const toggleHideI = () => {
    setIsHideI(!isHideI); // Toggle the value of 'hide'
  };

  const toggleHideO = () => {
    setIsHideO(!isHideO); // Toggle the value of 'hide'
  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">Yearly Report</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div>
          <h1 className="gx-font-weight-semi-bold">Pemasukan Tahunan</h1>
          <ExpenseChart items={incomingCashflow}>tes</ExpenseChart>
          <div className="gx-report-monthly-card-container">
            {isHideI == false
              ? chartDataPointsI.map((point, index) => (
                  <div
                    key={index}
                    className="gx-report-monthly-card gx-rounded-base"
                  >
                    <h3>{point.label}</h3>
                    <div className="gx-report-monthly-card-nominal-green gx-rounded-base">
                      <p>Rp {formatNumber(point.value)}</p>
                    </div>
                  </div>
                ))
              : null}
            <Button className="gx-mt-3" onClick={toggleHideI}>
              {isHideI == true ? "Show All" : "Hide All"}
            </Button>
          </div>
        </div>
        <br />
        <br />
        <div>
          <h1 className="gx-font-weight-semi-bold">Pengeluaran Tahunan</h1>
          <ExpenseChart items={outcomingCashflow}>tes</ExpenseChart>
          <div className="gx-report-monthly-card-container">
            {isHideO == false
              ? chartDataPointsO.map((point, index) => (
                  <div
                    key={index}
                    className="gx-report-monthly-card gx-rounded-base"
                  >
                    <h3>{point.label}</h3>
                    <div className="gx-report-monthly-card-nominal-red gx-rounded-base">
                      <p>Rp {formatNumber(point.value)}</p>
                    </div>
                  </div>
                ))
              : null}
            <Button className="gx-mt-3" onClick={toggleHideO}>
              {isHideO == true ? "Show All" : "Hide All"}
            </Button>
          </div>
        </div>
      </div>
      {/* <Button onClick={onClickButtonTesting}>
        Button Testing utk console log
      </Button> */}
    </div>
  );
};

export default SamplePage;
