import OrderProduct from './OrderProduct';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const OrderProductList = () => {
	const { orderProducts } = useSelector(store => store.order.orderProducts);

	return (
		<div className='container-fluid mt-3'>
			<table className='table table-hover table-striped'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>SKU</th>
						<th scope='col'>Price</th>
						<th scope='col'>Product_id</th>
						<th scope='col'>Qty</th>
						<th scope='col'>Options</th>
					</tr>
				</thead>
				<tbody>
					{orderProducts.map(orderProduct => {
						orderProduct.items.map(item => {
							return <OrderProduct key={item.id} {...item} />;
						});
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrderProductList;
