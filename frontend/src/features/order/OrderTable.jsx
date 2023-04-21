import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	GlobalOutlined,
	ClearOutlined,
	CoffeeOutlined,
} from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
	Badge,
	Dropdown,
	Space,
	Table,
	Input,
	Button,
	Modal,
	Form,
	message,
	Drawer,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { Edit, Trash, Save, TableIcon } from '../../icons';
import ProductTable from '../items/ProductTable';

const OrderTable = () => {
	const [orders, setOrders] = useState([]);
	const [sortedInfo, setSortedInfo] = useState({});
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const [editingRow, setEditingRow] = useState(null);
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('top');
	const [searchTermSku, setSearchTermSku] = useState('');
	const [drawerData, setDrawerData] = useState('');
	const [dataProduct, setDataProduct] = useState([]);
	//initial loading data main table
	useEffect(() => {
		loadData();
	}, []);

	//load all data
	const loadData = async () => {
		setLoading(true);
		const response = await axios.get('http://localhost:8080/api/orders'); //orderProductsJoin.json //http://localhost:8080/api/orders

		setOrders(response.data);
		setLoading(false);
	};

	//delete an order
	const handleDeleteOrder = record => {
		Modal.confirm({
			title: 'Are you sure to cancel this order?',
			okText: 'Yes',
			okType: 'danger',
			onOk: () => {
				// deleteOrder(record); need delete backend
				setOrders(pre => {
					return pre.filter(order => order.entity_id !== record.entity_id);
				});
			},
		});
		const id = record.entity_id;
		return axios
			.post(`http://localhost:8080/api/orders/${id}/delete`, data)
			.then(response => {
				setOrders(response.data);
			});
	};
	// delete an backend order
	const deleteOrder = async order => {
		const id = order.entity_id;
		const response = await axios.post(
			`http://localhost:8080/api/orders/${id}/delete`
		);
		setOrders(response.data);
	};

	// console.log('orders', orders);
	//delete an order-item
	const handleDeleteOrderItem = record => {
		Modal.confirm({
			title: 'Are you sure to delete this item?',
			okText: 'Yes',
			okType: 'danger',
			onOk: () => {
				deleteOrderItem(record.id);
			},
		});
	};

	// delete backend order-product
	const deleteOrderItem = id => {
		return axios
			.delete(`http://localhost:8080/order_products/${id}/delete`)
			.then(response => {
				setOrders(response.data);
			});
	};

	//handle save button sub row button
	const handleSaveSub = key => {
		form
			.validateFields()
			.then(values => {
				onFinishSub(key, values);
				updateOrderItem(values);
			})
			.catch(error => {
				console.log('error', error);
			});
	};
	const onFinishSub = (key, values) => {
		const updatedOrders = [...orders]; //make a copy of the orders
		const parentItem = updatedOrders.find(order => {
			//find that order
			return order.entity_id === key;
		});
		const index = parentItem.items.findIndex(obj => {
			//find the particular item row
			return obj.id === editingRow;
		});

		updatedOrders.splice(index, 1, {
			//remove the item, replace with the new value
			...values,
			key: index,
		});

		setOrders(updatedOrders); //update orders
		setEditingRow(null);
	};

	const updateOrderItem = subRowRecord => {
		const { id } = subRowRecord;

		return axios
			.post(`http://localhost:8080/order_products/${id}/edit`, subRowRecord)
			.then(data => {
				let parentIndex;
				let parentItem;
				orders.forEach((order, index) => {
					if (order.entity_id === data.data.order_id) {
						parentItem = order;
						parentIndex = index; //give the index to the order
					}
				});
				//find index
				const index = parentItem.items.findIndex(order => {
					return order.id === data.data.id;
				});
				//make copy
				const modifiedParentItems = [...parentItem.items];
				//replace with new value
				modifiedParentItems.splice(index, 1, subRowRecord);
				//modified the order items
				const modifiedParent = { ...parentItem, items: modifiedParentItems };
				//make copy of all orders
				const copyOrders = [...orders];
				//update the order
				copyOrders.splice(parentIndex, 1, modifiedParent);

				//set state
				setOrders(copyOrders);
			});
	};

	//handle save button main row button
	//need promise to make it work
	const handleSave = () => {
		form
			.validateFields()
			.then(values => {
				onFinish(values);
				updateOrder(values);
			})
			.catch(error => {
				console.log('error', error);
			});
	};

	//update orders frontend
	const onFinish = values => {
		const updatedOrders = [...orders];
		const index = updatedOrders.findIndex(obj => obj.entity_id === editingRow);
		updatedOrders.splice(index, 1, {
			...values,
			key: index,
		});

		setOrders(updatedOrders);
		setEditingRow(null);
	};

	//update order backend
	const updateOrder = formObj => {
		const {
			customer_email,
			customer_firstname,
			customer_lastname,
			entity_id,
			grand_total,
			total_qty_ordered,
		} = formObj;

		return axios.post(
			`http://localhost:8080/api/orders/${entity_id}/edit`,
			formObj
		);
		// .then(() => {
		// 	// setOrders({
		// 	// 	...state, //state is not defined
		// 	// 	customer_email,
		// 	// 	customer_firstname,
		// 	// 	customer_lastname,
		// 	// 	grand_total,
		// 	// 	total_qty_ordered,
		// 	// });
		// });
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
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='entity_id'
							rules={[
								{
									required: true,
									message: 'entity_id is required',
								},
							]}
						>
							<Input disabled={true} />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Created_Date',
			dataIndex: 'created_at',
			key: 'created_at',
			sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
			sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
			...getColumnSearchProps('created_at'),
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='created_at'
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input disabled={true} />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Email',
			dataIndex: 'customer_email',
			key: 'customer_email',
			editTable: true,
			sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
			sortOrder: sortedInfo.columnKey === 'customer_mail' && sortedInfo.order,
			...getColumnSearchProps('customer_email'),
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='customer_email'
							rules={[
								{
									required: true,
									message: 'Email is required',
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
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
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='customer_firstname'
							rules={[
								{
									required: true,
									message: 'First name is required',
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Last Name',
			dataIndex: 'customer_lastname',
			key: 'customer_lastname',
			sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
			sortOrder:
				sortedInfo.columnKey === 'customer_lastname' && sortedInfo.order,
			...getColumnSearchProps('customer_lastname'),
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='customer_lastname'
							rules={[
								{
									required: true,
									message: 'Last name is required',
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Total',
			dataIndex: 'grand_total',
			key: 'grand_total',
			editTable: true,
			sorter: (a, b) => a.grand_total - b.grand_total,
			sortOrder: sortedInfo.columnKey === 'grand_total' && sortedInfo.order,
			...getColumnSearchProps('grand_total'),
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='grand_total'
							rules={[
								{
									required: true,
									message: 'Grand total is required',
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Increment_id',
			dataIndex: 'increment_id',
			key: 'increment_id',
			sorter: (a, b) => a.increment_id - b.increment_id,
			sortOrder: sortedInfo.columnKey === 'increment_id' && sortedInfo.order,
			...getColumnSearchProps('increment_id'),
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='increment_id'
							rules={[
								{
									required: true,
									message: 'increment_id is required',
								},
							]}
						>
							<Input disabled={true} />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
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
			render: (text, record) => {
				if (editingRow === record.key) {
					return (
						<Form.Item
							name='total_qty_ordered'
							rules={[
								{
									required: true,
									message: 'Total quantity is required',
								},
							]}
						>
							<Input />
						</Form.Item>
					);
				} else {
					return <p>{text}</p>;
				}
			},
		},
		{
			title: 'Action',
			key: 'operation',
			render: (_, record) => {
				return (
					<>
						<Form.Item>
							<Space size='middle'>
								<button
									className='btn btn-sm btn-outline-warning'
									onClick={() => {
										setEditingRow(record.key);
										form.setFieldsValue({
											customer_email: record.customer_email,
											customer_firstname: record.customer_firstname,
											customer_lastname: record.customer_lastname,
											grand_total: record.grand_total,
											total_qty_ordered: record.total_qty_ordered,
											entity_id: record.entity_id,
											created_at: record.created_at,
											increment_id: record.increment_id,
										});
									}}
								>
									<Edit />
								</button>
								<button
									className='btn btn-sm btn-outline-danger'
									onClick={() => handleDeleteOrder(record)}
								>
									<Trash />
								</button>
								<button
									className='btn btn-sm btn-outline-success'
									onClick={handleSave}
								>
									<Save />
								</button>
							</Space>
						</Form.Item>
					</>
				);
			},
		},
	];
	//loop main column data
	const data = orders.map(order => ({
		key: order.entity_id,
		...order,
	}));

	//drawer;
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	//drawer search
	const handleDrawerChange = e => {
		setSearchTermSku(e.target.value);
	};

	//load sku data
	useEffect(() => {
		getProductBySku(searchTermSku);
	}, []);

	const getProductBySku = searchTermSku => {
		try {
			if (searchTermSku) {
				// Add null check
				return axios
					.get(`http://localhost:8080/api/products/${searchTermSku}`)
					.then(res => {
						const responseData = res.data;
						// Process the response data from backend if needed
						setDataProduct([responseData]);
					});
			}
		} catch (error) {
			console.error('Failed to fetch data from backend:', error);
		}
	};

	//reset drawer button
	const resetDrawer = () => {
		setSearchTermSku('');
		setDataProduct([]);
	};

	return (
		<>
			<div className='container-xxl mt-5'>
				<Form form={form}>
					<Table
						columns={columns}
						expandedRowRender={record => {
							//render sub table here
							const nestedColumns = [
								{
									title: 'ID',
									dataIndex: 'id',
									key: 'id',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='id'
													rules={[
														{
															required: true,
															message: 'id is required',
														},
													]}
												>
													<Input disabled={true} />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Product',
									dataIndex: 'name',
									key: 'name',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='name'
													rules={[
														{
															required: true,
															message: 'Product name is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'SKU',
									dataIndex: 'sku',
									key: 'sku',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='sku'
													rules={[
														{
															required: true,
															message: 'sku is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Price',
									dataIndex: 'price',
									key: 'price',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='price'
													rules={[
														{
															required: true,
															message: 'price is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Product_id',
									dataIndex: 'product_id',
									key: 'product_id',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='product_id'
													rules={[
														{
															required: true,
															message: 'product_id is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Quantity',
									dataIndex: 'qty_ordered',
									key: 'qty_ordered',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='qty_ordered'
													rules={[
														{
															required: true,
															message: 'qty is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Supplier',
									dataIndex: 'selected_supplier',
									key: 'selected_supplier',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='selected_supplier'
													rules={[
														{
															required: true,
															message: 'supplier is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Supplier Cost',
									dataIndex: 'selected_supplier_cost',
									key: 'selected_supplier_cost',
									render: (text, record) => {
										if (editingRow === record.id) {
											return (
												<Form.Item
													name='selected_supplier_cost'
													rules={[
														{
															required: true,
															message: 'selected_supplier_cost is required',
														},
													]}
												>
													<Input />
												</Form.Item>
											);
										} else {
											return <p>{text}</p>;
										}
									},
								},
								{
									title: 'Action',
									dataIndex: 'operation',
									key: 'operation',
									render: (_, recordSub) => {
										return (
											<>
												<Form.Item>
													<Space size='small'>
														<EditOutlined
															style={{ color: 'orange' }}
															onClick={() => {
																//use recordSub instead of record to avoid override record because we need the order key
																setEditingRow(recordSub.id); //also need to use id, not key
																form.setFieldsValue({
																	id: recordSub.id,
																	name: recordSub.name,
																	sku: recordSub.sku,
																	price: recordSub.price,
																	product_id: recordSub.product_id,
																	qty_ordered: recordSub.qty_ordered,
																	selected_supplier:
																		recordSub.selected_supplier,
																	selected_supplier_cost:
																		recordSub.selected_supplier_cost,
																});
															}}
														/>
														{/* <DeleteOutlined
															style={{ color: 'red' }}
															onClick={() => handleDeleteOrderItem(record)}
														/> */}
														<SaveOutlined
															style={{ color: 'green' }}
															onClick={() => handleSaveSub(record.key)}
														/>
														<GlobalOutlined
															style={{ color: 'blue' }}
															onClick={showDrawer}
														/>
													</Space>
												</Form.Item>
											</>
										);
									},
								},
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
				</Form>
			</div>
			<Drawer placement={placement} width={300} onClose={onClose} open={open}>
				<div className='mb-2'>
					<Space>
						<Input
							placeholder='Enter your item'
							onChange={handleDrawerChange}
							type='text'
							allowClear
							value={searchTermSku}
						/>
						<CoffeeOutlined
							size='middle'
							style={{
								width: 50,
								color: 'black',
							}}
							onClick={() => getProductBySku(searchTermSku)}
						/>
						<ClearOutlined
							size='middle'
							style={{
								color: 'black',
							}}
							onClick={() => {
								resetDrawer();
							}}
						/>
					</Space>
				</div>
				<div>
					<ProductTable searchTermSku={searchTermSku} data={dataProduct} />
				</div>
			</Drawer>
		</>
	);
};

export default OrderTable;
