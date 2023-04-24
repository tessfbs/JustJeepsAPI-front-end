import { Table } from 'antd';
import React, { useState } from 'react';
import test from './test.css';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    children: [
      { key: '1-1', name: 'John Brown Jr.', age: 12, address: 'New York No. 2 Lake Park' },
      { key: '1-2', name: 'John Brown Sr.', age: 43, address: 'New York No. 3 Lake Park' },
    ],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    children: [
      { key: '2-1', name: 'Jim Green Jr.', age: 16, address: 'London No. 2 Lake Park' },
      { key: '2-2', name: 'Jimmy Green Sr.', age: 72, address: 'London No. 3 Lake Park' },
    ],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    children: [
      { key: '3-1', name: 'Joe Black Jr.', age: 12, address: 'Sidney No. 2 Lake Park' },
      { key: '3-2', name: 'Joe Black Sr.', age: 43, address: 'Sidney No. 3 Lake Park' },
    ],
  },
];

const expandedRowRender = (record) => {
  return (
    <Table
      columns={columns}
      dataSource={record.children}
      pagination={false}
      className="expanded-row"
    />
  );
};

const watermarkedRowStyle = {
  opacity: 0.5, // Set opacity to 50%
  backgroundColor: '#f0f0f0', // Set background color to light gray
  cursor: 'not-allowed', // Set cursor to not-allowed to indicate that the row is not clickable
};

const Test = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const onExpand = (expanded, record) => {
    // Update the expandedRowKeys state to toggle the expanded state of the row
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const watermarkedRowStyle = {
    opacity: 0.5, // Set opacity to 50%
    backgroundColor: '#f0f0f0', // Set background color to light gray
    cursor: 'not-allowed', // Set cursor to not-allowed to indicate that the row is not clickable
  };

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
        onExpand,
        expandedRowKeys,
        // Add custom rowClassName function to apply watermarker style to non-expanded rows
        rowClassName: (record) =>
          expandedRowKeys.includes(record.key)
            ? ''
            : 'watermarked-row',
      }}
      dataSource={data}
      style={{ marginTop: 20 }}
    >
      <style>{`
        .watermarked-row {
          opacity: ${watermarkedRowStyle.opacity};
          background-color: ${watermarkedRowStyle.backgroundColor};
          cursor: ${watermarkedRowStyle.cursor};
        }
      `}</style>
    </Table>
  );
};

export default Test;
