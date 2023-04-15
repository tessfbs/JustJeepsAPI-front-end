import OrderProduct from './OrderProduct';
import { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import axios from 'axios';
import orderProducts from '../../../orderProducts';
const columns = [
	{
		title: 'Order_id',
		dataIndex: 'order_id',
		key: 'order_id',
	},
	{
		title: 'Created_Date',
		dataIndex: 'created_day',
		key: 'created_day',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'First Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Last Name',
		dataIndex: 'lastName',
		key: 'lastName',
	},
	{
		title: 'Total',
		dataIndex: 'total',
		key: 'total',
	},
	{
		title: 'Increment_id',
		dataIndex: 'increment_id',
		key: 'increment_id',
	},
	{
		title: 'Total Qty',
		dataIndex: 'total_qty',
		key: 'total_qty',
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
	const [checkStrictly, setCheckStrictly] = useState(false);
	// useEffect(() => {
	// 	axios
	// 		.get('/orderProductsJoin.json')
	// 		.then(res => setOrders(console.log('data', res.data)))
	// 		.catch(err => console.log(err));
	// }, []);

	return (
		// <div className='container-fluid mt-3'>
		// 	<table className='table table-hover table-striped'>
		// 		<thead>
		// 			<tr>
		// 				<th scope='col'>ID</th>
		// 				<th scope='col'>Name</th>
		// 				<th scope='col'>SKU</th>
		// 				<th scope='col'>Price</th>
		// 				<th scope='col'>Product_id</th>
		// 				<th scope='col'>Qty</th>
		// 				<th scope='col'>Options</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 			{orderProducts.map(orderProduct => {
		// 				orderProduct.items.map(item => {
		// 					return <OrderProduct key={item.id} {...item} />;
		// 				});
		// 			})}
		// 		</tbody>
		// 	</table>
		// </div>
		<>
			<Space
				align='center'
				style={{
					marginBottom: 16,
				}}
			>
				CheckStrictly:{' '}
				<Switch checked={checkStrictly} onChange={setCheckStrictly} />
			</Space>
			<Table
				columns={columns}
				rowSelection={{
					...rowSelection,
				}}
				dataSource={orderProducts}
			/>
		</>
	);
};

export default OrderProductList;
