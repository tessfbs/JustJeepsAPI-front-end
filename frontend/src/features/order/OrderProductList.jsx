import OrderProduct from './OrderProduct';
import { useEffect, useState } from 'react';
import { Space, Switch, Table, Popconfirm } from 'antd';
import axios from 'axios';
import orderProducts from '../../../orderProducts';
const columns = [
	{
		title: 'Order_id',
		dataIndex: 'entity_id',
		key: 'entity_id',
	},
	{
		title: 'Created_Date',
		dataIndex: 'created_at',
	},
	{
		title: 'Email',
		dataIndex: 'customer_email',
		editTable: true,
	},
	{
		title: 'First Name',
		dataIndex: 'customer_firstname',
	},
	{
		title: 'Last Name',
		dataIndex: 'customer_lastname',
	},
	{
		title: 'Total',
		dataIndex: 'grand_total',
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
		editTable: true,
	},
	{
		title: 'Action',
		dataIndex: 'action',
		render: (_, record) => orderProducts.length >= 1? (
		<Popconfirm title='Are you sure you want to delete?' onConfirm={() => handleDelete(record)}>

		</Popconfirm>
		)
	},
];

const children = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Item',
		dataIndex: 'name',
	},
	{
		title: 'SKU',
		dataIndex: 'sku',
	},
	{
		title: 'Price',
		dataIndex: 'price',
	},
	{
		title: 'Product_id',
		dataIndex: 'product_id',
	},
	{
		title: 'Qty',
		dataIndex: 'qty_ordered',
	},
];
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

	// useEffect(() => {
	// 	loadData();
	// }, []);

	// const loadData = async () => {
	// 	setLoading(true);
	// 	const response = await axios.get('orderProductsJoin.json');
	// 	setOrders(response.data);
	// 	setLoading(false);
	// };

	// const modifiedData = orders.map(({items, ...orders}) => ({
	// 	...orders,
	// 	children: items,
	// }));
	// console.log();

	return (
		<>

			<Table
				columns={columns}
				childrenColumnName={children}
				rowSelection={{
					...rowSelection,
				}}
				dataSource={orderProducts}
				bordered
				loading={loading}
			/>
		</>
	);
};

export default OrderProductList;
