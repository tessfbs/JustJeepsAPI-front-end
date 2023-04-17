import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Dropdown, Space, Table } from 'antd';
import orderProducts from '../../../orderProducts';

const sampleData = [
	{
		entity_id: 82311,
		id: 1,
		created_at: '2023-04-14 01:51:05',
		customer_email: 'tasljansen@gmail.com',
		coupon_code: null,
		customer_firstname: 'Anita',
		customer_lastname: 'Jansen',
		grand_total: 303.57,
		increment_id: '200038574',
		order_currency_code: 'CAD',
		total_qty_ordered: 1,
		items: [
			{
				id: 1,
				name: 'Rugged Ridge Custom Fit Neoprene Front Seat Covers For 2011-18 Jeep Wrangler JK 2 Door & Unlimited 4 Door Models 13215-',
				sku: 'RR-13215.09',
				order_id: 82311,
				base_price: 254.11,
				base_price_incl_tax: 266.82,
				discount_amount: 0,
				discount_invoiced: 0,
				discount_percent: 0,
				original_price: 298.95,
				price: 254.11,
				price_incl_tax: 266.82,
				product_id: 26318,
				qty_ordered: 1,
			},
			{
				id: 2,
				name: 'Rugged Ridge (Grey) Custom Fit Neoprene Front Seat Covers For 2011-18 Jeep Wrangler JK 2 Door & Unlimited 4 Door Models 13215.09',
				sku: 'RR-13215.09',
				order_id: 82311,
				base_price: 0,
				base_price_incl_tax: null,
				discount_amount: 0,
				discount_invoiced: 0,
				discount_percent: 0,
				original_price: 0,
				price: 0,
				price_incl_tax: null,
				product_id: 13728,
				qty_ordered: 1,
			},
		],
	},
	{
		entity_id: 82310,
		id: 2,
		created_at: '2023-04-14 01:48:19',
		customer_email: 'peterjesso@gmail.com',
		coupon_code: null,
		customer_firstname: 'Peter',
		customer_lastname: 'Jesso',
		grand_total: 223.18,
		increment_id: '200038573',
		order_currency_code: 'CAD',
		total_qty_ordered: 2,
		items: [
			{
				id: 3,
				name: 'SpiderWebShade GrabBag GRABBAG-',
				sku: 'SWS-GRABBAG',
				order_id: 82310,
				base_price: 43.31,
				base_price_incl_tax: 49.81,
				discount_amount: 0,
				discount_invoiced: 0,
				discount_percent: 0,
				original_price: 50.95,
				price: 43.31,
				price_incl_tax: 49.81,
				product_id: 37053,
				qty_ordered: 1,
			},
			{
				id: 4,
				name: 'SpiderWebShade GrabBag GRABBAG Black',
				sku: 'SWS-GRABBAG',
				order_id: 82310,
				base_price: 0,
				base_price_incl_tax: null,
				discount_amount: 0,
				discount_invoiced: 0,
				discount_percent: 0,
				original_price: 0,
				price: 0,
				price_incl_tax: null,
				product_id: 37042,
				qty_ordered: 1,
			},
			{
				id: 5,
				name: 'Poison Spyder Customs LED 3rd Brake Light and License Plate Light 41-04-406',
				sku: 'PS-41-04-406',
				order_id: 82310,
				base_price: 125.76,
				base_price_incl_tax: 144.62,
				discount_amount: 0,
				discount_invoiced: 0,
				discount_percent: 0,
				original_price: 147.95,
				price: 125.76,
				price_incl_tax: 144.62,
				product_id: 27667,
				qty_ordered: 1,
			},
		],
	},
];

const OrderTable = () => {
	const [orders, setOrders] = useState([]);
	const [sortedInfo, setSortedInfo] = useState({});
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

	const handleChange = (...sorter) => {
		const { order, field } = sorter[2];
		setSortedInfo({ columnKey: field, order });
	};

	const expandedRowRender = () => {
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: 'Product',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'SKU',
				dataIndex: 'sku',
				key: 'sku',
			},
			{
				title: 'Price',
				dataIndex: 'price',
				key: 'price',
			},
			{
				title: 'Product_id',
				dataIndex: 'product_id',
				key: 'product_id',
			},
			{
				title: 'Quantity',
				dataIndex: 'qty_ordered',
				key: 'qty_ordered',
			},
			{
				title: 'Action',
				dataIndex: 'operation',
				key: 'operation',
				render: () => (
					<Space size='middle'>
						<a>Edit</a>
						<a>Delete</a>
					</Space>
				),
			},
			{
				title: 'Order_id',
				dataIndex: 'order_id',
				key: 'order_id',
			},
		];

		const data = [];
		for (let i = 0; i < modifiedData.length; i++) {
			console.log('modifiedData[i].name: ', modifiedData[i]);
			data.push({
				key: i.toString(),
				id: i + 1,
				name: modifiedData[i]?.items[i]?.name,
				sku: modifiedData[i]?.items[i]?.sku,
				price: modifiedData[i]?.items[i]?.price,
				product_id: modifiedData[i]?.items[i]?.product_id,
				qty_ordered: modifiedData[i]?.items[i]?.qty_ordered,
				order_id: modifiedData[i]?.items[i]?.order_id,
			});
		}

		return <Table columns={columns} dataSource={data} pagination={false} />;
	};

	const columns = [
		{
			title: 'Order_id',
			dataIndex: 'entity_id',
			key: 'entity_id',
			sorter: (a, b) => a.entity_id - b.entity_id,
			sortOrder: sortedInfo.columnKey === 'entity_id' && sortedInfo.order,
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
			sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
			sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
			sortOrder: sortedInfo.columnKey === 'customer_mail' && sortedInfo.order,
		},
		{
			title: 'First Name',
			dataIndex: 'customer_firstname',
			key: 'customer_firstname',
			sorter: (a, b) =>
				a.customer_firstname?.localeCompare(b.customer_firstname),
			sortOrder:
				sortedInfo.columnKey === 'customer_firstname' && sortedInfo.order,
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
			sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
			sortOrder:
				sortedInfo.columnKey === 'customer_lastname' && sortedInfo.order,
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
			sorter: (a, b) => a.grand_total - b.grand_total,
			sortOrder: sortedInfo.columnKey === 'grand_total' && sortedInfo.order,
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
			sorter: (a, b) => a.increment_id - b.increment_id,
			sortOrder: sortedInfo.columnKey === 'increment_id' && sortedInfo.order,
		},
		{
			title: 'Total Qty',
			dataIndex: 'total_qty_ordered',
			key: 'total_qty_ordered',
			editTable: true,
			sorter: (a, b) => a.total_qty_ordered - b.total_qty_ordered,
			sortOrder:
				sortedInfo.columnKey === 'total_qty_ordered' && sortedInfo.order,
		},
		{
			title: 'Action',
			key: 'operation',
			render: () => (
				<Space size='middle'>
					<a>Edit</a>
					<a>Delete</a>
				</Space>
			),
		},
	];

	const data = modifiedData.map(order => ({
		key: order.entity_id.toString(),
		...order,
	}));

	return (
		<>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
					defaultExpandedRowKeys: ['0'],
				}}
				dataSource={data}
				bordered
				rowKey={record => record.id}
				onChange={handleChange}
				size='middle'
			/>
		</>
	);
};

export default OrderTable;
