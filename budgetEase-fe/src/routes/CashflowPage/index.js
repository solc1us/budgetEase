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

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const onChangeSwitch = (e) => {
    // console.log(`switch to ${e}`);
  };

  const history = useHistory();

  const [cashflow, setCashflow] = useState([]);

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
        setCashflow(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    // console.log(user_credent.id);

    const { date } = values;
    const [dateFrom, dateTo] = date.map((date) => date.format("YYYY-MM-DD"));
    // Now 'dateFrom' and 'dateTo' are strings
    console.log(dateFrom, dateTo);

    console.log(values);

    console.log(dateFrom, dateTo);

    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
        dateFrom: dateFrom,
        dateTo: dateTo,
        kategori: values.kategori,
      },
    })
      .then(function (response) {
        console.log(response);
        setCashflow(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const onClickButtonTest = () => {
    console.log(cashflow);
  };

  const tableData = cashflow.map((item, index) => {
    return { key: item.id, no: index + 1, ...item };
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Nominal",
      dataIndex: "nominal",
      key: "nominal",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nominal - b.nominal,
      render: (nominal) => <span>Rp {nominal.toLocaleString("id-ID")}</span>,
    },
    {
      title: "Arus",
      dataIndex: "arus",
      key: "arus",
      render: (arus) => (
        <span style={{ color: arus == "i" ? "green" : "red" }}>
          {arus == "i" ? "Masuk" : "Keluar"}
        </span>
      ),
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClickEditButton(record.id)}>
            <img src="assets\icons\pencil-square.svg" />
          </a>
          <a onClick={() => onClickDeleteButton(record.id)}>
            <img src="assets\icons\trash-fill.svg" />
          </a>
        </Space>
      ),
    },
  ];

  const onClickDeleteButton = (id) => {
    Modal.warning({
      centered: true,
      icon: <ExclamationCircleFilled />,
      okType: "danger",
      okCancel: "danger",
      content: (
        <div>
          <p>Apakah anda yakin?</p>
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
            <span>Warnings !</span>
          </Col>
        </Row>
      ),
      onOk() {
        axios({
          method: "DELETE",
          url: `http://localhost:8080/cashflow/deletebyid/${id}`,
        })
          .then((response) => {
            console.log(response);
            history.push("/cashflow");

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

            // Jika berhasil, atur data
          })
          .catch((error) => {
            // Jika terjadi kesalahan, atur pesan kesalahan dan/atau redirect ke halaman lain
            // setError("Data tidak ditemukan");
            console.log(error);
            // navigate("/"); // Ganti dengan URL halaman lain jika diperlukan
          });
      },
      onCancel() {},
    });
  };

  const onClickEditButton = (id) => {
    console.log("Edit button clicked for id:", id);
    axios
      .get(`http://localhost:8080/cashflow/findbyid/${id}`)
      .then((response) => {
        console.log(response);
        history.push(`/cashflow-edit/${id}`);

        // Jika berhasil, atur data
      })
      .catch((error) => {
        // Jika terjadi kesalahan, atur pesan kesalahan dan/atau redirect ke halaman lain
        // setError("Data tidak ditemukan");
        console.log(error);
        // navigate("/"); // Ganti dengan URL halaman lain jika diperlukan
      });
  };

  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <Form
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              rules={[{ required: true, message: "Input tanggal pencarian!" }]}
              name="date"
            >
              <RangePicker />
            </Form.Item>
            <Form.Item name="kategori">
              <Input placeholder="Kategori" />
            </Form.Item>
            <Form.Item>
              <Button className="gx-mb-0 gx-w-100" htmlType="submit">
                <img src="/assets/icons/search.svg" width="16" height="16" />
              </Button>
            </Form.Item>
          </Form>
          <Link to="/cashflow-newcashflow">
            <Button className="gx-btn-success">
              <img src="/assets/icons/plus.svg" width="16" height="16" />
              <span style={{ color: "black" }}>Add New</span>
            </Button>
          </Link>
        </div>
        <div className="gx-main-user-table">
          <Table dataSource={tableData} columns={columns}></Table>
          <Button onClick={onClickButtonTest}>
            Button testing utk console log
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
