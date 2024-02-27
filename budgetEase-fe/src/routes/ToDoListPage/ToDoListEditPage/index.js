import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Form, Input, Button, DatePicker, Modal, Row, Col, Switch } from "antd";

import moment from "moment";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [initialData, setInitialData] = useState();

  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lakukan permintaan ke server dengan ID yang ada dalam URL
    axios({
      method: "get",
      url: `http://localhost:8080/todolist/findbyid/${id}`,
    })
      .then((response) => {
        // Jika berhasil, atur data
        // console.log(id);

        let date = [
          moment(response.data.data.tanggal, "YYYY-MM-DD"),
          moment(response.data.data.deadline, "YYYY-MM-DD"),
        ];

        let updatedData = {
          ...response.data.data,
          date: date,
        };

        let updatedResponseData = {
          ...response.data,
          data: updatedData,
        };

        setInitialData(updatedResponseData);
      })
      .catch((error) => {
        // Jika terjadi kesalahan, atur pesan kesalahan dan/atau redirect ke halaman lain
        setError("Data tidak ditemukan");
        console.log(error);
        // navigate("/"); // Ganti dengan URL halaman lain jika diperlukan
      });
  }, [id, history]);

  return (
    <div>
      <h1 className="gx-main-user-main-title">To-do List</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <h1 className="gx-mb-4">Edit existing To-Do List!</h1>
        </div>
        <div className="gx-flex-column gx-px-3">
          {error ? (
            <h3>Tidak ada to do list dengan id: {id}</h3>
          ) : (
            initialData && <ToDoEditForm initialValues={initialData} />
          )}
        </div>
      </div>
    </div>
  );
};

function ToDoEditForm({ initialValues }) {
  const history = useHistory();

  const onFinish = (values) => {
    console.log(values);
    const { date } = values;
    const [startDate, endDate] = date.map((date) => date.format("YYYY-MM-DD"));
    // Now 'startDate' and 'endDate' are strings
    console.log(startDate, endDate);


    axios({
      method: "put",
      url: "http://localhost:8080/todolist/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: values.id,
        tanggal: startDate,
        deadline: endDate,
        check: values.check,
        kegiatan: values.kegiatan,
      }),
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
  };

  const onFinishFailed = () => {
    console.log("failed");
  };

  const onClickButtonTest = () => {
    console.log("initialdata", initialValues.data);
    console.log("check", initialValues.data.check);
  };

  return (
    <Form
      initialValues={initialValues.data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="id" label="ID :">
        <Input disabled />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Input tanggal dan deadline!" }]}
        name="date"
        label="Tanggal & Deadline"
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="check"
        label="is Done?"
        valuePropName="checked"
      >
        <Switch
          // onChange={onChangeSwitch}
          checkedChildren="True"
          unCheckedChildren="False"
        />
      </Form.Item>
      <Form.Item
        // initialValue={initialData.data.kegiatan}
        rules={[{ required: true, message: "Input kegiatan anda!" }]}
        name="kegiatan"
        label="Kegiatan"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button className="" htmlType="submit">
          <span style={{ color: "black" }}>Edit</span>
        </Button>
      </Form.Item>
      {/* <Button onClick={onClickButtonTest}>
        <span style={{ color: "black" }}>button testing console log</span>
      </Button> */}
    </Form>
  );
}

export default SamplePage;
