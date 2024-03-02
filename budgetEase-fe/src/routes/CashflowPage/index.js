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
  Select,
} from "antd";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";

import axios from "axios";

const { RangePicker } = DatePicker;

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;
  const history = useHistory();
  const [kategori, setKategori] = useState([]);
  const [cashflow, setCashflow] = useState([]);

  const onChangeSwitch = (e) => {
    console.log(`switch to ${e}`);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
      },
    })
      .then(function (response) {
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

    const { date } = values;
    let dateFrom;
    let dateTo;

    if (date) {
      [dateFrom, dateTo] = date.map((date) => date.format("YYYY-MM-DD"));
    }

    let arus;

    if (values.arus == true) {
      arus = "i";
    } else if (values.arus == false) {
      arus = "o";
    }

    console.log("values", values);

    console.log(dateFrom, dateTo);

    axios({
      method: "get",
      url: "http://localhost:8080/cashflow/find",
      params: {
        idUsers: user_credent.id,
        dateFrom: dateFrom,
        dateTo: dateTo,
        arus: arus,
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
          })
          .catch((error) => {
            console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      });
  }, []);

  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <Form
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item name="date">
              <RangePicker />
            </Form.Item>
            <Form.Item
              name="kategori">
              <Select placeholder="Pilih Kategori" style={{ width: "9rem" }}>
                {kategori.map((item) => (
                  <Select.Option key={item.id} value={item.kategori}>
                    {item.kategori}
                  </Select.Option>
                ))},
                <Select.Option
                  key="addNew"
                  value="addNew"
                  style={{ backgroundColor: "#52c41a" }}>
                  <Link to="/cashflow-newkategori">
                    <img
                      src="/assets/icons/plus.svg"
                      width="16"
                      height="16"
                      alt="Add"
                    />
                    <span style={{ color: "black" }}>Add Kategori</span>
                  </Link>
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="arus"
              label="Arus"
              initialValue={false}
              valuePropName="checked">
              <Switch
                onChange={onChangeSwitch}
                checkedChildren="In"
                unCheckedChildren="Out"/>
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
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
