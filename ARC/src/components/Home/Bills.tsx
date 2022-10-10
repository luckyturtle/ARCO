import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Asset",
    dataIndex: "Asset",
    key: "name",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
  {
    title: "Deposited",
    dataIndex: "Deposited",
    key: "Deposited",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
  {
    title: "Borrowed",
    dataIndex: "Borrowed",
    key: "Borrowed",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
  {
    title: "Balance",
    dataIndex: "Balance",
    key: "Balance",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
  {
    title: "Collateral",
    dataIndex: "Collateral",
    key: "Collateral",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
  {
    title: "Operation",
    dataIndex: "Operation",
    key: "Operation",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    ) => <span>{text}</span>,
  },
];

export default function Bills() {
  return (
    <div className="w-full">
      <span className="text-lg font-bold mb-10 w-full">My Bill</span>
      <div className="w-full rounded-md shadow-sm mt-6 flex flex-row items-center justify-center overflow-hidden">
        <Table
          columns={columns}
          dataSource={[]}
          style={{ width: "100%" }}
          pagination={false}
        />
        ;
      </div>
    </div>
  );
}
