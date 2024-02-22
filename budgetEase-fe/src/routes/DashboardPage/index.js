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

const SamplePage = () => {
  // useEffect(() => {

  // })

  return (
    <div>
      <h1 className="gx-main-user-main-title">Dashboard</h1>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pemasukan</h1>
            <p className="income">Rp 126.314.431</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Sisa Uang</h1>
            <p className="diff">Rp 126.314.431</p>
          </div>
          <div className="gx-dashboard-boxed-content gx-rounded-base">
            <h1>Pengeluaran</h1>
            <p className="outcome">Rp 126.314.431</p>
          </div>
        </div>
      </div>
      <div className="gx-main-user-container gx-rounded-lg">
        <div className="gx-dashboard-flex">
          <h1> Analisis Pengeluaran Bulanan</h1>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
