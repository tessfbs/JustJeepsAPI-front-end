import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import './items.scss';

const ProductTable = () => {
	const [data, setData] = useState([]);
	const [searchTermSku, setSearchTermSku] = useState('');

	//search by sku
	useEffect(() => {
		const getProductBySku = async () => {
			try {
				if (searchTermSku && searchTermSku.sku) {
					// Add null check
					console.log('value', searchTermSku);
					await axios
						.get(`http://localhost:8080/api/products/${searchTermSku.sku}`)
						.then(res => {
							const responseData = res.data;
							console.log('Data from backend by sku:', responseData);
							// Process the response data from backend if needed
							setData([responseData]);
						});
				}
			} catch (error) {
				console.error('Failed to fetch data from backend:', error);
			}
		};
		getProductBySku();
	}, [searchTermSku]);

	const columns_by_sku = [
		{
			title: 'Manufacturer',
			dataIndex: 'brand_name',
			key: 'brand_name',
		},
		{
			title: 'SKU',
			dataIndex: 'sku',
			key: 'sku',
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: image => <img src={image} alt='Product' width='50' />,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Vendor Name',
			dataIndex: 'vendorProducts',
			key: 'vendor_id',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					<div key={vendorProduct.id}>{vendorProduct.vendor.name}</div>
				)),
		},
		{
			title: 'Vendor Cost',
			dataIndex: 'vendorProducts',
			key: 'vendor_cost',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					<div key={vendorProduct.id}>{`$${vendorProduct.vendor_cost}`}</div>
				)),
		},
		{
			title: 'Margin %',
			key: 'margin',
			render: record => {
				const { price, vendorProducts } = record;
				return vendorProducts.map(vendorProduct => {
					const { vendor_cost } = vendorProduct;
					const margin = ((price - vendor_cost) / price) * 100;
					const className = margin < 20 ? 'red-margin' : '';
					return (
						<div
							key={vendorProduct.vendor_id}
							className={className}
						>{`${margin.toFixed(2)}%`}</div>
					);
				});
			},
		},
		{
			title: 'Vendor Inventory',
			dataIndex: 'vendorProducts',
			key: 'vendor_inventory',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					<div key={vendorProduct.id}>{vendorProduct.vendor_inventory}</div>
				)),
		},
		{
			title: 'Vendor SKU   ',
			dataIndex: 'vendorProducts',
			key: 'vendor_sku',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					<div key={vendorProduct.id}>{vendorProduct.vendor_sku}</div>
				)),
		},
		// {
		//   title: "Competitor Price",
		//   dataIndex: "competitorProducts",
		//   key: "competitor_price",
		//   render: (competitorProducts) =>
		//     competitorProducts.length > 0 ? (
		//       <div
		//         key={competitorProducts[0].id}
		//       >{`$${competitorProducts[0].competitor_price}`}</div>
		//     ) : (
		//       "-"
		//     ),
		// },
	];

	return (
		<div>
			<Table
				dataSource={data}
				columns={columns_by_sku}
				rowKey='sku'
				pagination={false} // Change pageSize as needed
			/>
		</div>
	);
};

export default ProductTable;
