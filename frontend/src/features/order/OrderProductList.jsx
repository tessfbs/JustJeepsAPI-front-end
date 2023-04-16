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
	const [sortedInfo, setSortedInfo] = useState({});
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
			sorter: (a, b) => a.entity_id - b.entity_id,
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
			sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
		},
		{
			title: 'First Name',
			dataIndex: 'customer_firstname',
			key: 'customer_firstname',
			sorter: (a, b) =>
				a.customer_firstname?.localeCompare(b.customer_firstname),
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
			sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
			sorter: (a, b) => a.grand_total - b.grand_total,
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
			sorter: (a, b) => a.increment_id - b.increment_id,
		},
		{
			title: 'Total Qty',
			dataIndex: 'total_qty_ordered',
			key: 'total_qty_ordered',
			editTable: true,
			sorter: (a, b) => a.total_qty_ordered - b.total_qty_ordered,
		},
	];

	return (
		<>
			<div className='container-fluid mt-5'>
				<Table
					columns={columns}
					rowSelection={rowSelection}
					pagination={{ pageSize: 10 }}
					dataSource={modifiedData}
					bordered
					// loading={loading}
					rowKey={record => record.id}
				/>
			</div>
		</>
	);
};

export default OrderProductList;
