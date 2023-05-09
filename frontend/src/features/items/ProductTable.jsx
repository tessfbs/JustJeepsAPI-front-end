import { Table, Button, Checkbox, Tag } from 'antd';
import CopyText from '../copyText/CopyText';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckSquareOutlined } from '@ant-design/icons';
import { sizeHeight } from '@mui/system';

const ProductTable = props => {
	console.log('props', props);
	const [selectedVendorCost, setSelectedVendorCost] = useState(null);

	// Function to update an order product
	const handleVendorCostClick = vendorProduct => {
		console.log('vendorProduct', vendorProduct);
		setSelectedVendorCost(vendorProduct.vendor_cost);
		axios
			.post(
				`http://localhost:8080/order_products/${props.orderProductId}/edit/selected_supplier`,
				{
					selected_supplier_cost: vendorProduct.vendor_cost.toString(),
					selected_supplier: vendorProduct.vendor.name,
				}
			)
			.then(res => {
				console.log(res.data);
			})
			.catch(error => {
				console.error(error);
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
			width: '25%',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			render: price => {
				if (props.orderProductPrice) {
					return `$${props.orderProductPrice.toFixed(2)}`;
				} else {
					return `$${price.toFixed(2)}`;
				}
			},
		},
		{
      title: "Suggested Vendor",
      dataIndex: "vendorProducts",
      key: "lowest_cost",
      align: "center",
			width: '10%',
			render: (vendorProducts, record) => {
				const vendorsWithInventory = vendorProducts.filter(
					(vp) => vp.vendor_inventory > 0
				);
				if (vendorsWithInventory.length === 0) {
					return "-";
				}
				const minVendorProduct = vendorsWithInventory.reduce((min, curr) => {
					if (curr.vendor_cost < min.vendor_cost) {
						return curr;
					}
					return min;
				}, vendorsWithInventory[0]);
			
				const margin =
					((props.orderProductPrice - minVendorProduct.vendor_cost) / props.orderProductPrice) * 100;
	
			
				return (
					<div
					style={
            //setup green border if margin is greater than 20%
            margin > 20 ? { border: "2px solid green" } : { border: "2px solid red" }

          }
					>
						<div>{minVendorProduct.vendor.name}</div>
						<div>{`$${minVendorProduct.vendor_cost}`}</div>
						<div> {`${margin.toFixed(0)}%`} </div>
						<Checkbox
							onChange={() => handleVendorCostClick(minVendorProduct)}
							style={{ 
								color: 'green' ,
								//style checkbox is a more professional look
								color: margin > 20 ? "green" : "red",

						}}
						

						/> 
					</div>
				);
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
					<div
						key={vendorProduct.id}
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<CopyText text={`${vendorProduct.vendor_cost}`}>
							<span style={{ marginRight: 8 }}>{`${vendorProduct.vendor_cost}`}</span>
						</CopyText>
						<Checkbox
							onChange={() => handleVendorCostClick(vendorProduct)}
							style={{ color: 'green' }}
							//size extra large
							size="large"
						/>
					</div>
				)),
		},
		
		{
      title: "Margin %",
      key: "margin",
      align: "center",
      render: (record) => {
        const { price, vendorProducts } = record;
 
        return vendorProducts.map((vendorProduct) => {
          const { vendor_cost } = vendorProduct;
          const margin =
            ((props.orderProductPrice - vendor_cost) / props.orderProductPrice) * 100;
          const className = margin < 20 ? "red-margin" : "";
          return (
            <div key={vendorProduct.vendor_id}>
              {margin > 20 ? (
                <Tag
                  color="#1f8e24"
                  style={{
                    fontSize: "18px",
                    padding: "5px",
                    marginBottom: "7px",
                  }}
                >
                  {margin.toFixed(2)}%
                </Tag>
              ) : (
                <Tag color="#f63535"
                style={{
                  fontSize: "18px",
                  padding: "5px",
                  marginBottom: "7px",
                }}
              >
                {margin.toFixed(2)}%</Tag>
              )}
            </div>
          );
        });
      },
    },
		
    {
      title: "Vendor Inventory",
      dataIndex: "vendorProducts",
      key: "vendor_inventory",
      align: "center",
      render: (vendorProducts) =>
        vendorProducts.map((vendorProduct) => (
          <div
            key={vendorProduct.id}
          >
            {vendorProduct.vendor_inventory > 0 ? (
                <Tag
                  color="#1f8e24"
                  style={{
                    fontSize: "18px",
                    padding: "5px",
                    marginBottom: "12px",
                    width: "45px",
                  }}
                >
                  {vendorProduct.vendor_inventory}
                </Tag>
              ) : (
                <Tag color="#f63535"
                style={{
                  fontSize: "18px",
                  padding: "5px",
                  marginBottom: "12px",
                  width: "45px",
                }}>{vendorProduct.vendor_inventory}</Tag>
              )}
          </div>
          
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
				footer={() => (

					<div>
					{	props.data.length > 0 && (
							<h5>Vendors for this Brand: {props.data[0].vendors}</h5>
						)}
					</div>
				)}
			/>
		</div>
	);
};

export default ProductTable;
