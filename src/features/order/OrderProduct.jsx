import axios from 'axios';
import { Option } from '../../icons';
import { useState, useEffect } from 'react';
import orderProducts from '../../../orderProducts';
const OrderProduct = () => {
	// useEffect(() => {
	//   fetch(`/api/orders/${order_id}`)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			// Get the items array from the order details
	// 			const orderProducts = data.items;

	// 			// Render the order product details
	// 			orderProducts.forEach(product => {
	// 				const { id, name, sku, price, product_id, qty_ordered } = product;
	// 				return (
	//           <tr>
	//             <th scope='row'>{id}</th>
	//             <td>{name}</td>
	//             <td>{sku}</td>
	//             <td>$ {price}</td>
	//             <td>{product_id}</td>
	//             <td>{qty_ordered}</td>
	//             <td>
	//               <a role='button' class='link-warning'>
	//                 <Option />
	//               </a>
	//             </td>
	//           </tr>
	//         );
	//         });
	// 		})
	// 		.catch(error => console.error(error));

	// }, []);
	const orderProducts = orderProducts.filter(
		order => order.entity_id === order.items.order_id
	);

	orderProducts.map(orderProduct => {
		orderProduct.items.map(item => {
			return (
				<tr>
					<th scope='row'>{item.id}</th>
					<td>{item.name}</td>
					<td>{item.sku}</td>
					<td>$ {item.price}</td>
					<td>{item.product_id}</td>
					<td>{item.qty_ordered}</td>
					<td>
						<a role='button' class='link-warning'>
							<Option />
						</a>
					</td>
				</tr>
			);
		});
	});
};

export default OrderProduct;
