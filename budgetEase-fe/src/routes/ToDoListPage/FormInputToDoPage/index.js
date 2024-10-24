import React, { useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import axios from "axios";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Modal, Row, Col } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const history = useHistory();

  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const onFinishFailed = (errorInfo) => {};

  let tanggal;
  let deadline;

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    tanggal = dateString[0];
    deadline = dateString[1];
  };

  const onFinish = (values) => {
    // console.log(user_credent.id);
    // console.log("values tanggal", values.date);
    console.log(tanggal, deadline);
    // console.log(userId)

    axios({
      method: "post",
      url: "http://localhost:8080/todolist/create",
      data: {
        id_users: user_credent.id,
        tanggal: tanggal,
        deadline: deadline,
        isCheck: false,
        kegiatan: values.kegiatan,
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

        history.push("/todolist");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // dispatch(AuthActions.loginUserRequest(values));
  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">To-do List</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <h1 className="gx-mb-4">Create new To-Do List!</h1>
        </div>
        <div className="gx-flex-column gx-px-3">
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              rules={[
                { required: true, message: "Input tanggal dan deadline!" },
              ]}
              name="date"
              label="Tanggal & Deadline"
            >
              <RangePicker onChange={onChangeDate} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Input kegiatan anda!" }]}
              name="kegiatan"
              label="Kegiatan"
            >
              <Input />
            </Form.Item>
            <div className="gx-flex-row gx-justify-content-between">
              <Form.Item className="gx-mb-0">
                <Button className="gx-mb-0" htmlType="submit">
                  <span style={{ color: "black" }}>Submit</span>
                </Button>
              </Form.Item>
              <Form.Item className="gx-mb-0">
                <Button className="gx-mb-0">
                  <Link to="/todolist">
                    <span style={{ color: "black" }}>Back</span>
                  </Link>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
