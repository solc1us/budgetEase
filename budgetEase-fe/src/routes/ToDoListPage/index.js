import React, { useEffect, useState } from "react";

import axios from "axios";

import IntlMessages from "util/IntlMessages";
import {
  Form,
  Input,
  Button,
  Modal,
  Table,
  Switch,
  Space,
  Checkbox,
  Row,
  Col,
} from "antd";

import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import { Link, useNavigate, useHistory } from "react-router-dom";

// const toDoListData = [tanggal, deadline, check, kegiatan];

const SamplePage = () => {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const onChangeSwitch = (e) => {
    // console.log(`switch to ${e}`);
  };

  const history = useHistory();

  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/todolist/find",
      params: {
        idUsers: user_credent.id,
      },
    })
      .then(function (response) {
        // console.log("dari useEffect", response.data.data);
        setToDoList(response.data.data);
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
        setToDoList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    // dispatch(AuthActions.loginUserRequest(values));
  };

  const onClickButtonTest = () => {
    console.log(toDoList);
  };

  const tableData = toDoList.map((item, index) => {
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
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Done",
      dataIndex: "check",
      key: "check",
      render: (check) => (
        <span style={{ color: check ? "green" : "red" }}>
          {check ? "True" : "False"}
        </span>
      ),
    },
    {
      title: "Kegiatan",
      dataIndex: "kegiatan",
      key: "kegiatan",
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
          url: `http://localhost:8080/todolist/deletebyid/${id}`
        })
          .then((response) => {
            console.log(response);
            history.push('/todolist');

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
      // .get(`https://edc-api.loginusa.id/edcservice/receipt/findbyid/${id}`)
      .get(`http://localhost:8080/todolist/findbyid/${id}`)
      .then((response) => {
        console.log(response);
        history.push(`/todolist-edit/${id}`);

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
            <Form.Item name="isCheck" label="is Done?" initialValue={false} valuePropName="checked">
              <Switch
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
          <Table dataSource={tableData} columns={columns}></Table>
          {/* <Button onClick={onClickButtonTest}>
            Button testing utk console log
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
