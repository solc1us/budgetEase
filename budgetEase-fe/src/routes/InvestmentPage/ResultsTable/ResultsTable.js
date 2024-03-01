import React, { useState } from "react";

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

const formatter = new Intl.NumberFormat("en-ID", {
  style: "currency",
  currency: "IDR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

function ResultsTable(props) {
  const columns = [
    {
      title: "Tahun",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Tabungan Akhir",
      dataIndex: "savingsEndOfYear",
      key: "savingsEndOfYear",
      render: (text) => formatter.format(text).replace(",", "."),
    },
    {
      title: "Keuntungan Tahunan",
      dataIndex: "yearlyInterest",
      key: "yearlyInterest",
      render: (text) => formatter.format(text).replace(",", "."),
    },
    {
      title: "Total Keuntungan",
      dataIndex: "totalInterest",
      key: "totalInterest",
      render: (text, record) => {
        // console.log("Total Interest", record.savingsEndOfYear, props.initialInvestment, record.yearlyContribution, record.year)
        const totalInterest =
          record.savingsEndOfYear -
          props.initialInvestment -
          record.yearlyContribution * record.year;
        return formatter.format(totalInterest).replace(",", ".");
      },
    },
    {
      title: "Uang Investasi",
      dataIndex: "investedCapital",
      key: "investedCapital",
      render: (text, record) => {
        // console.log(props.initialInvestment, record.yearlyContribution, record.year)
        const investedCapital =
          props.initialInvestment + record.yearlyContribution * record.year;
        return formatter.format(investedCapital).replace(",", ".");
      },
    },
  ];

  // console.log(props.data)

  // Assuming props.data is the dataSource
  const dataSource = props.data.map((yearData) => ({
    key: yearData.year, // Assuming 'year' is unique
    year: yearData.year,
    savingsEndOfYear: yearData.savingsEndOfYear,
    yearlyInterest: yearData.yearlyInterest,
    yearlyContribution: yearData.yearlyContribution,
    totalInterest:
      yearData.savingsEndOfYear -
      props.initialInvestment -
      yearData.yearlyContribution * yearData.year,
    investedCapital:
      props.initialInvestment + yearData.yearlyContribution * yearData.year,
  }));

  console.log("datasource", dataSource);

  return (
    <Table
      className="gx-mt-2"
      columns={columns}
      dataSource={dataSource}
      pagination={false} // Optional: Disable pagination if not needed
    />
  );
}

export default ResultsTable;
