import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import axios from "axios";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Modal,
  Row,
  Col,
  Switch,
  InputNumber,
  Select,
} from "antd";

import moment from "moment";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const history = useHistory();

  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/kategori/find",
      params: {
        idUsers: user_credent.id,
      },
    })
      .then(function (response) {
        console.log(response.data.data);
        setKategori(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const onFinishKategori = (values) => {
    // console.log(user_credent.id);

    console.log(values);
    // console.log(userId)

    axios({
      method: "post",
      url: "http://localhost:8080/kategori/create",
      data: {
        id_users: user_credent.id,
        kategori: values.kategori,
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
          <h1 className="gx-mb-4">Create new Kategori!</h1>
        </div>
        <div className="gx-flex-column gx-px-3">
          <Form onFinish={onFinishKategori} onFinishFailed={onFinishFailed}>
            <Form.Item
              rules={[{ required: true, message: "Input kategori!" }]}
              name="kategori"
              label="Kategori"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="existingkategori"
              label="Kategori yang ada"
            >
              <Select>
                {kategori.map((item) => (
                  <Select.Option disabled key={item.id} value={item.kategori} style={{color: "gray"}}>
                    {item.kategori}
                  </Select.Option>
                ))}
                ,
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="gx-mb-0" htmlType="submit">
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
