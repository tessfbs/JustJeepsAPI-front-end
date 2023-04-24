import { Table, Button } from 'antd';
import CopyText from '../copyText/CopyText';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = props => {
	console.log('props.orderProductPrice', props.orderProductPrice);
	const [selectedVendorCost, setSelectedVendorCost] = useState(null);

	const [buttonColor, setButtonColor] = useState({});

	const handleVendorCostClick = (vendorProduct) => {
		setSelectedVendorCost(vendorProduct.vendor_cost);
		axios.post(`http://localhost:8080/order_products/${props.orderProductId}/edit/selected_supplier`, {
			selected_supplier_cost: vendorProduct.vendor_cost.toString(),
			selected_supplier: vendorProduct.vendor.name
		})
		.then(res => {
			console.log(res.data);
			// Change the color of the button to green on success
			setButtonColor({ [vendorProduct.id]: 'green' });
		})
		.catch(error => {
			console.error(error);
			// Change the color of the button to red on error
			setButtonColor({ [vendorProduct.id]: 'red' });
		});
	};


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
			render: price => {
					if (props.orderProductPrice) {
							return props.orderProductPrice;
					} else {
							return price;
					}
			},
	},
		{
			title: 'Vendor Name',
			dataIndex: 'vendorProducts',
			key: 'vendor_id',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					<CopyText key={vendorProduct.id} text={vendorProduct.vendor.name} />
				)),
		},
		{
			title: 'Vendor Cost',
			dataIndex: 'vendorProducts',
			key: 'vendor_cost',
			render: vendorProducts =>
			vendorProducts.map(vendorProduct => (
				<div key={vendorProduct.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
					<CopyText text={`${vendorProduct.vendor_cost}`}>
						<span style={{ marginRight: 8 }}>{`${vendorProduct.vendor_cost}`}</span>
					</CopyText>
					<Button style={{ backgroundColor: buttonColor[vendorProduct.id] }} onClick={() => handleVendorCostClick(vendorProduct)}>Select</Button>
				</div>
			)),
		},
		
		
		{
			title: 'Margin %',
			key: 'margin',
			render: record => {
				const { vendorProducts } = record;
				return vendorProducts.map(vendorProduct => {
					const { vendor_cost } = vendorProduct;
					const margin = ((props.orderProductPrice - vendor_cost) / props.orderProductPrice) * 100;
					const className = margin < 20 ? 'red-margin' : '';
					return (
						<CopyText
							key={vendorProduct.vendor_id}
							className={className}
							text={`${margin.toFixed(2)}%`}
						/>
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
	];

	return (
		<div>
			<Table
				dataSource={props.data}
				columns={columns_by_sku}
				rowKey='sku'
				pagination={false}
			/>
		</div>
	);
};

export default ProductTable;
