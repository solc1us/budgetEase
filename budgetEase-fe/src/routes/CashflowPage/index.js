import React from "react";

import { Form, Input, Button } from "antd";

import {Link} from "react-router-dom";

const SamplePage = () => {
  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow</h1>
      <div className="gx-main-user-container gx-rounded-lg">
      <div className="gx-main-user-table-filter">
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="Search" />
            </Form.Item>
            <Form.Item>
              <Button
                className="gx-mb-0 gx-w-100"
                htmlType="submit"
              >
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
      </div>
    </div>
  );
};

export default SamplePage;
