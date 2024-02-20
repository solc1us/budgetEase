import React, { useState } from "react";

import axios from "axios";

import IntlMessages from "util/IntlMessages";
import { Form, Input, Button, Radio, Table, Switch, Space } from "antd";

import {Link} from "react-router-dom";

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const onChangeSwitch = (e) => {
    // console.log(`switch to ${e}`);
  };

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    // console.log(user_credent.id);
    console.log("values is check", values.isCheck);
    // console.log(userId)

    axios({
      method: "get",
      url: "http://localhost:8080/todolist/find",
      params: {
        idUsers: user_credent.id,
        isCheck: values.isCheck,
        kegiatan: values.kegiatan,
      },
    })
      .then(function (response) {
        console.log(response);
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
          <Form
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="kegiatan">
              <Input placeholder="Kegiatan" />
            </Form.Item>
            <Form.Item name="isCheck" label="is Check" initialValue={true}>
              <Switch
                defaultChecked
                // onChange={onChangeSwitch}
                checkedChildren="True"
                unCheckedChildren="False"
              />
            </Form.Item>
            <Form.Item>
              <Button className="gx-mb-0 gx-w-100" htmlType="submit">
                <img src="/assets/icons/search.svg" width="16" height="16" />
              </Button>
            </Form.Item>
          </Form>
          <Link to="/todolist-newtodolist">
            <Button className="gx-btn-success">
              <img src="/assets/icons/plus.svg" width="16" height="16" />
              <span style={{ color: "black" }}>Add New</span>
            </Button>
          </Link>
        </div>
        <div className="gx-main-user-table">
          <Table></Table>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
