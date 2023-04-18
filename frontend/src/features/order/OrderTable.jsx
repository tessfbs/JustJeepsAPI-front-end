import {
	DownOutlined,
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Badge, Dropdown, Space, Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import orderProducts from '../../../orderProducts';
import { Edit, Trash } from '../../icons';

const OrderTable = () => {
	const [orders, setOrders] = useState([]);
	const [sortedInfo, setSortedInfo] = useState({});
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);

	useEffect(() => {
		loadData();
	}, []);

	//load all data
	const loadData = async () => {
		setLoading(true);
		const response = await axios.get('orderProductsJoin.json');

		setOrders(response.data);
		setLoading(false);
	};

	//delete
	const handleDeleteOrder = record => {
		deleteOrder(id);
		setOrders(pre => {
			return pre.filter(order => order.entity_id !== record.entity_id);
		});
	};

	const deleteOrder = async id => {
		const response = await axios.delete(`api/orders/${id}`);
		setOrders(response.data);
	};

	//sort
	const handleChange = (...sorter) => {
		const { order, field } = sorter[2];
		setSortedInfo({ columnKey: field, order });
	};

	//search function
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('');
	};

	//search
	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={e => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

	//set up main column
	const columns = [
		{
			title: 'Order_id',
			dataIndex: 'entity_id',
			key: 'entity_id',
			sorter: (a, b) => a.entity_id - b.entity_id,
			sortOrder: sortedInfo.columnKey === 'entity_id' && sortedInfo.order,
			...getColumnSearchProps('entity_id'),
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
			sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
			...getColumnSearchProps('created_at'),
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
			sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
			sortOrder: sortedInfo.columnKey === 'customer_mail' && sortedInfo.order,
			...getColumnSearchProps('customer_email'),
		},
		{
			title: 'First Name',
			dataIndex: 'customer_firstname',
			key: 'customer_firstname',
			sorter: (a, b) =>
				a.customer_firstname?.localeCompare(b.customer_firstname),
			sortOrder:
				sortedInfo.columnKey === 'customer_firstname' && sortedInfo.order,
			...getColumnSearchProps('customer_firstname'),
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
			sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
			sortOrder:
				sortedInfo.columnKey === 'customer_lastname' && sortedInfo.order,
			...getColumnSearchProps('customer_lastname'),
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
			sorter: (a, b) => a.grand_total - b.grand_total,
			sortOrder: sortedInfo.columnKey === 'grand_total' && sortedInfo.order,
			...getColumnSearchProps('grand_total'),
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
			sorter: (a, b) => a.increment_id - b.increment_id,
			sortOrder: sortedInfo.columnKey === 'increment_id' && sortedInfo.order,
			...getColumnSearchProps('increment_id'),
		},
		{
			title: 'Total Qty',
			dataIndex: 'total_qty_ordered',
			key: 'total_qty_ordered',
			editTable: true,
			sorter: (a, b) => a.total_qty_ordered - b.total_qty_ordered,
			sortOrder:
				sortedInfo.columnKey === 'total_qty_ordered' && sortedInfo.order,
			...getColumnSearchProps('total_qty_ordered'),
		},
		{
			title: 'Action',
			key: 'operation',
			render: record => (
				<Space size='middle'>
					<button className='btn btn-sm btn-outline-warning'>
						<Edit />
					</button>
					<button
						className='btn btn-sm btn-outline-danger'
						onClick={() => handleDeleteOrder(record)}
					>
						<Trash />
					</button>
				</Space>
			),
		},
	];
	//loop main column data
	const data = orders.map(order => ({
		key: order.entity_id.toString(),
		...order,
	}));

	return (
		<>
			<div className='container-xxl mt-5'>
				<table className='table table-striped'>
					<Table
						columns={columns}
						expandedRowRender={record => {
							//render sub table here
							const nestedColumns = [
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
										<Space size='small'>
											<EditOutlined />
											<DeleteOutlined
												style={{ color: 'red' }}
												onClick={() => handleDeleteOrder(record)}
											/>
										</Space>
									),
								},
								// {
								// 	title: 'Order_id',
								// 	dataIndex: 'order_id',
								// 	key: 'order_id',
								// },
								// {
								// 	title: 'Supplier',
								// 	dataIndex: 'supplier_name',
								// 	key: 'supplier_name',
								// },
							];
							return (
								<Table
									columns={nestedColumns}
									dataSource={record.items}
									pagination={false}
								/>
							);
						}}
						dataSource={data}
						bordered
						rowKey={record => record.id}
						onChange={handleChange}
						size='small'
					/>
				</table>
			</div>
		</>
	);
};

export default OrderTable;
