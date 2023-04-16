import OrderProduct from './OrderProduct';
import { useEffect, useState } from 'react';
import { Space, Switch, Table, Popconfirm, Button } from 'antd';
import axios from 'axios';
import orderProducts from '../../../orderProducts';

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			'selectedRows: ',
			selectedRows
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	},
};

const OrderProductList = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		setLoading(true);
		const response = await axios.get('orderProductsJoin.json');
		console.log('response: ', response);

		setOrders(response.data);
		setLoading(false);
	};

	console.log('orders: ', orders);
	// const modifiedData =
	// 	orders.length > 0 &&
	// 	orders.map(({ items, ...orders }) => ({
	// 		...orders,
	// 		children: items,
	// 	}));

	const prepareData = arr => {
		if (arr.length < 1) {
			return [];
		}
		return arr.map(order => ({ ...order, children: order.items }));
	};

	const modifiedData = prepareData(orders);

	const handleDelete = value => {
		const dataSource = [...modifiedData]; //modifiedData
		const filteredOrders = dataSource.filter(
			order => order.entity_id !== value.id
		);
		setOrders(filteredOrders);
	};

	const pagination = {
		total: modifiedData.length,
		current: 1,
		showSizeChanger: true,
		onShowSizeChange(current, pageSize) {
			console.log('Current: ', current, '; PageSize: ', pageSize);
		},
		onChange(current) {
			console.log('Current: ', current);
		},
	};

	const columns = [
		{
			title: 'Order_id',
			dataIndex: 'entity_id',
			key: 'entity_id',
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
		},
		{
			title: 'First Name',
			dataIndex: 'customer_firstname',
			key: 'customer_firstname',
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
		},
		{
			title: 'Total Qty',
			dataIndex: 'total_qty_ordered',
			key: 'total_qty_ordered',
			editTable: true,
		},
	];

	return (
		<>
			<Table
				columns={columns}
				rowSelection={rowSelection}
				pagination={pagination}
				dataSource={modifiedData}
				bordered
				loading={loading}
			/>
		</>
	);
};

export default OrderProductList;

// {
// 	title: 'Action',
// 	dataIndex: 'action', //modefiedData below
// 	render: (_, record) =>
// 		modefiedData.length >= 1 ? (
// 			<Popconfirm
// 				title='Are you sure you want to delete?'
// 				onConfirm={() => handleDelete(record)}
// 			>
// 				<Button danger type='primary'>
// 					Delete
// 				</Button>
// 			</Popconfirm>
// 		) : null,
// },
