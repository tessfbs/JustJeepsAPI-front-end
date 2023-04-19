// export const SupplierTable = () => {
// 	return <div>SupplierTable</div>;
// };






import React from 'react';
import { Table, Space, Form, Input, Button } from 'antd';
// import 'antd/dist/antd.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
    render: (text) => <a href={text} target="_blank" rel="noreferrer">{text}</a>,
  },
];

const vendorsData = [
  {
    name: "Keystone",
    website: "https://wwwsc.ekeystone.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA"
  },
  {
    name: "Meyer",
    website: "https://online.meyerdistributing.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA"
  },
  {
    name: "Omix",
    website: "https://www.omixparts.com/",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA"
  },
  {
    name: "Quadratec",
    website: "https://www.quadratecwholesale.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA"
  }
];

export const SupplierTable = () => {
  const [form] = Form.useForm();
  const [vendors, setVendors] = React.useState(vendorsData);

  const onFinish = (values) => {
    const newVendor = {
      name: values.name,
      website: values.website,
    };
    setVendors([...vendors, newVendor]);
    form.resetFields();
  };

  return (
    <>
      <Table 
			columns={columns} 
			dataSource={vendors} 
			/>

      <Form form={form} onFinish={onFinish} style={{ marginTop: '16px' }}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="website" label="Website" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Add Vendor
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};



