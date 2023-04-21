import { Table } from 'antd';
import CopyText from '../copyText/CopyText';

const ProductTable = props => {
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
					// <div key={vendorProduct.id}>{vendorProduct.vendor.name}</div>
					<CopyText key={vendorProduct.id} text={vendorProduct.vendor.name} />
				)),
		},
		{
			title: 'Vendor Cost',
			dataIndex: 'vendorProducts',
			key: 'vendor_cost',
			render: vendorProducts =>
				vendorProducts.map(vendorProduct => (
					// <div key={vendorProduct.id}>{`$${vendorProduct.vendor_cost}`}</div>
					<CopyText
						key={vendorProduct.id}
						text={`$${vendorProduct.vendor_cost}`}
					/>
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
						// <div
						// 	key={vendorProduct.vendor_id}
						// 	className={className}
						// >{`${margin.toFixed(2)}%`}</div>
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
				pagination={false} // Change pageSize as needed
			/>
		</div>
	);
};

export default ProductTable;
