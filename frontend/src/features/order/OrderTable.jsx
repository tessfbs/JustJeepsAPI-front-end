import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import orderProducts from '../../../orderProducts';
const items = [
	{
		key: '1',
		label: 'Action 1',
	},
	{
		key: '2',
		label: 'Action 2',
	},
];
const OrderTable = () => {
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
		];
		const data = [];
		for (let i = 0; i < orderProducts?.items?.length; i++) {
			data.push({
				key: orderProducts.items[i].id.toString(),
				id: orderProducts.items[i].id,
				name: orderProducts.items[i].name,
				sku: orderProducts.items[i].sku,
				price: orderProducts.items[i].price,
				product_id: orderProducts.items[i].product_id,
				qty_ordered: orderProducts.items[i].qty_ordered,
			});
		}

		return <Table columns={columns} dataSource={data} pagination={false} />;
	};

	const columns = [
		{
			title: 'Order_id',
			dataIndex: 'entity_id',
			key: 'entity_id',
			// sorter: (a, b) => a.entity_id - b.entity_id,
			// sortOrder: sortedInfo.columnKey === 'entity_id' && sortedInfo.order,
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
			// sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
			// sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
			// sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
			// sortOrder: sortedInfo.columnKey === 'customer_mail' && sortedInfo.order,
		},
		{
			title: 'First Name',
			dataIndex: 'customer_firstname',
			key: 'customer_firstname',
			// sorter: (a, b) =>
			// 	a.customer_firstname?.localeCompare(b.customer_firstname),
			// sortOrder:
			// 	sortedInfo.columnKey === 'customer_firstname' && sortedInfo.order,
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
			// sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
			// sortOrder:
			// 	sortedInfo.columnKey === 'customer_lastname' && sortedInfo.order,
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
			// sorter: (a, b) => a.grand_total - b.grand_total,
			// sortOrder: sortedInfo.columnKey === 'grand_total' && sortedInfo.order,
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
			// sorter: (a, b) => a.increment_id - b.increment_id,
			// sortOrder: sortedInfo.columnKey === 'increment_id' && sortedInfo.order,
		},
		{
			title: 'Total Qty',
			dataIndex: 'total_qty_ordered',
			key: 'total_qty_ordered',
			editTable: true,
			// sorter: (a, b) => a.total_qty_ordered - b.total_qty_ordered,
			// sortOrder:
			// 	sortedInfo.columnKey === 'total_qty_ordered' && sortedInfo.order,
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

	const data = orderProducts.map(order => ({
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
				size='middle'
			/>
		</>
	);
};

export default OrderTable;
