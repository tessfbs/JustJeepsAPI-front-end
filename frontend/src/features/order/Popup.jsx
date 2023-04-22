import { useState, useEffect, useCallback } from 'react';
import { Space, Input, Drawer } from 'antd';
import { ClearOutlined, CoffeeOutlined } from '@ant-design/icons';
import ProductTable from '../items/ProductTable';
import axios from 'axios';

const Popup = ({ placement, onClose, sku, orderProductId }) => {
	const [searchTermSku, setSearchTermSku] = useState(sku);
	const [dataProduct, setDataProduct] = useState([]);
	const [dataOrderProductID, setDataOrderProductID] = useState(orderProductId);

	const resetDrawer = useCallback(() => {
		setSearchTermSku('');
		setDataProduct([]);
	}, []);

	const getProductBySku = useCallback(searchTermSku => {
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
	}, []);

	useEffect(() => {
		setSearchTermSku(sku);
		getProductBySku(sku);
	}, [sku]);

	return (
		<Drawer placement={placement} width={300} onClose={onClose} open={true}>
			<div className='mb-2'>
				<Space>
					<Input
						placeholder='Enter your item'
						onChange={setSearchTermSku}
						type='text'
						// allowClear
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
				<ProductTable searchTermSku={searchTermSku} data={dataProduct} orderProductId={dataOrderProductID} />
			</div>
		</Drawer>
	);
};
export default Popup;
