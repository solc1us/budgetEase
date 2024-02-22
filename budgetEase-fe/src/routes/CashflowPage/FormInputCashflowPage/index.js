import React, { useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import axios from "axios";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Modal, Row, Col, Switch, InputNumber } from "antd";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const history = useHistory();

  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    // console.log(user_credent.id);

    let arus;

    if (values.arus == true) {
      arus = "i"
    } else if (values.arus == false) {
      arus = "o"
    }

    console.log(values);
    // console.log(userId)

    axios({
      method: "post",
      url: "http://localhost:8080/cashflow/create",
      data: {
        id_users: user_credent.id,
        tanggal: values.date.format('YYYY-MM-DD'),
        arus: arus,
        nominal: values.nominal,
        kategori: values.kategori,
        keterangan: values.keterangan,
      },
    })
      .then(function (response) {
        console.log(response);

        Modal.success({
          centered: true,
          icon: <CheckCircleFilled />,
          okType: "Pemberitahuan !",
          content: (
            <div className="gx-text-dark">
              <p>{response.data.message}</p>
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
                <span>Berhasil!</span>
              </Col>
            </Row>
          ),
          onOk() {},
          onCancel() {},
        });

        history.push("/cashflow");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <h1 className="gx-mb-4">Create new Cashflow!</h1>
        </div>
        <div className="gx-flex-column gx-px-3">
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              rules={[{ required: true, message: "Input tanggal pencarian!" }]}
              name="date"
              label="Tanggal"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="arus"
              label="Arus"
              initialValue={false}
              valuePropName="checked"
            >
              <Switch
                // onChange={onChangeSwitch}
                checkedChildren="In"
                unCheckedChildren="Out"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Input nominal!" }]}
              name="nominal"
              label="Nominal"
            >
              <InputNumber style={{ width: '50%' }}  />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Input kategori!" }]}
              name="kategori"
              label="Kategori"
            >
              <Input  />
            </Form.Item>
            <Form.Item
              name="keterangan"
              label="Keterangan"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button className="" htmlType="submit">
                <span style={{ color: "black" }}>Submit</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
