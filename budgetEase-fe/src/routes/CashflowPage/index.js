import React from "react";

import { Form, Input, Button } from "antd";

const SamplePage = () => {
  return (
    <div>
      <h1 className="gx-main-user-main-title">Cashflow Page</h1>
      <div className="gx-main-user-container gx-rounded-lg">
      <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
