import React, { useState } from "react";

import { Form, Input, InputNumber, Button, Col } from "antd";

const initialUserInput = {
  "current-savings": 10000,
  "yearly-contribution": 1200,
  "expected-return": 7,
  duration: 10,
};

function FormInputInvest(props) {
  // const [enteredCurrentSavings, setEnteredCurrentSavings] = useState("");
  // const [enteredYearlyContribution, setEnteredYearlyContribution] = useState("");
  // const [enteredExpectedReturn, setEnteredExpectedReturn] = useState("");
  // const [enteredDuration, setEnteredDuration] = useState("");

  const [userInput, setUserInput] = useState(initialUserInput);

  function resetHandler(event) {
    // setEnteredCurrentSavings("");
    // setEnteredYearlyContribution("");
    // setEnteredExpectedReturn("");
    // setEnteredDuration("");
    setUserInput(initialUserInput);
  }

  // function inputChangeHandler(identifier, value) {
  //   if (identifier === "current-savings") {
  //     setEnteredCurrentSavings(value);
  //   } else if (identifier === "yearly-contribution") {
  //     setEnteredYearlyContribution(value);
  //   } else if (identifier === "expected-return") {
  //     setEnteredExpectedReturn(value);
  //   } else {
  //     setEnteredDuration(value);
  //   }
  // }

  function inputChangeHandler(input, value) {
    // setUserInput((prevInput) => {
    //   return {
    //     ...prevInput,
    //     [input]: +value,
    //   };
    // });
  }

  function submitHandler(values) {
    props.onCalculate(values);
  }

  return (
    <div>
      <Form
        layout="inline"
        onFinish={submitHandler}
        initialValues={initialUserInput}
        className="gx-invest-form-input"
      >
        <div className="gx-invest-input-group">
          <Form.Item
            rules={[{ required: true, message: "Input tabungan sekarang!" }]}
            label="Current Savings (Rp)"
            name="current-savings"
          >
            <InputNumber
              onChange={inputChangeHandler}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Input investasi tahunan!" }]}
            label="Yearly Savings (Rp)"
            name="yearly-contribution"
          >
            <InputNumber
              onChange={inputChangeHandler}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div className="gx-invest-input-group">
          <Form.Item
            rules={[
              { required: true, message: "Input ekspektasi return!" },
              {
                type: "number",
                min: 1,
                message: "Return input minimal 1%!",
              },
            ]}
            label="Expected Interest (%, per year)"
            name="expected-return"
          >
            <InputNumber
              onChange={inputChangeHandler}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Input durasi investasi!" },
              {
                type: "number",
                min: 1,
                message: "Waktu input minimal 1 tahun!",
              },
              {
                type: "number",
                max: 70,
                message: "Waktu input maksimal 70 tahun!",
              },
            ]}
            label="Investment Duration (years)"
            name="duration"
          >
            <InputNumber
              onChange={inputChangeHandler}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div className="gx-invest-input-group gx-w-100">
          <Form.Item>
            {/* <Button onClick={resetHandler} htmlType="reset" className="gx-mb-0 gx-px-5">
              Reset
            </Button> */}
            <Button htmlType="submit" className="gx-mb-0 gx-px-5">
              Calculate
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default FormInputInvest;
