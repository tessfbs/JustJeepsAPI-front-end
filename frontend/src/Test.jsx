import React from 'react';
import { Table } from 'antd';
import { css } from 'react-emotion';

const tableCSS = css({
  margin: '40px 120px',
  backgroundColor: 'white',
  '& table': {
    borderCollapse: 'collapse'
  },
  '& thead > tr > th': {
    backgroundColor: 'darkblue',
    color: 'white',
  },
  '& thead > tr': {
    borderWidth: '2px',
    borderColor: 'yellow',
    borderStyle: 'solid'
  }
});

const StyledTable = ({ data, columns }) => (
    <Table
      className={tableCSS}
      dataSource={data}
      columns={columns}
    />
);