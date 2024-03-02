import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircleFilled } from "@ant-design/icons";
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
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SamplePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [initialData, setInitialData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/cashflow/findbyid/${id}`,
    })
      .then((response) => {
        setInitialData(response.data.data);
      })
      .catch((error) => {
        setError("Data tidak ditemukan");
        console.log(error);
      });
  }, [id, history]);

  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-main-user-table-filter">
          <h1 className="gx-mb-4">Edit existing Cashflow!</h1>
        </div>
        <div className="gx-flex-column gx-px-3">
          {error ? (
            <h3>Tidak ada cashflow dengan id: {id}</h3>
          ) : (
            initialData && <CashflowEditForm initialValues={initialData} />
          )}
        </div>
      </div>
    </div>
  );
};

function CashflowEditForm({ initialValues }) {
  const user_credent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;

  const history = useHistory();

  const initialData = {
    id: initialValues.id,
    id_users: initialValues.id_users,
    arus: initialValues.arus == "i" ? true : false,
    nominal: initialValues.nominal,
    kategori: initialValues.kategori,
    keterangan: initialValues.keterangan,
    tanggal: moment(initialValues.tanggal, "YYYY-MM-DD"),
  };

  const onFinish = (values) => {
    console.log(values);
    const date = values.tanggal.format("YYYY-MM-DD");

    axios({
      method: "put",
      url: "http://localhost:8080/cashflow/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: values.id,
        tanggal: date,
        arus: values.arus == true ? "i" : "o",
        nominal: values.nominal,
        kategori: values.kategori,
        keterangan: values.keterangan,
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

        history.push("/cashflow");
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
      });
  }, []);

  return (
    <Form
      initialValues={initialData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="id" label="ID :">
        <Input disabled />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Input tanggal!" }]}
        name="tanggal"
        label="Tanggal"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="arus" label="Arus" valuePropName="checked">
        <Switch
          checkedChildren="In"
          unCheckedChildren="Out"
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Input nominal anda!" }]}
        name="nominal"
        label="Nominal"
      >
        <InputNumber style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Input Tidak Valid" }]}
        name="kategori"
        label="Kategori"
      >
        <Select>
          {kategori.map((item) => (
            <Select.Option key={item.id} value={item.kategori}>
              {item.kategori}
            </Select.Option>
          ))}
          ,
        </Select>
      </Form.Item>
      <Form.Item name="keterangan" label="Keterangan">
        <Input />
      </Form.Item>
      <div className="gx-flex-row gx-justify-content-between">
        <Form.Item className="gx-mb-0">
          <Button className="gx-mb-0" htmlType="submit">
            <span style={{ color: "black" }}>Edit</span>
          </Button>
        </Form.Item>
        <Form.Item className="gx-mb-0">
          <Button className="gx-mb-0">
            <Link to="/cashflow">
              <span style={{ color: "black" }}>Back</span>
            </Link>
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default SamplePage;