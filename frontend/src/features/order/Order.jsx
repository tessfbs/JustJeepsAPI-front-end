import { View } from '../../icons';

const Order = ({
	entity_id,
	created_at,
	customer_email,
	customer_firstname,
	customer_lastname,
	grand_total,
	increment_id,
	total_qty_ordered,
}) => {
	return (
		<tr>
			<th scope='row'>{entity_id}</th>
			<td>{created_at}</td>
			<td>{customer_email}</td>
			<td>{customer_firstname}</td>
			<td>{customer_lastname}</td>
			<td>$ {grand_total}</td>
			<td>{increment_id}</td>
			<td>{total_qty_ordered}</td>
			<td>
				<a role='button' class='link-warning'>
					<View />
				</a>
			</td>
		</tr>
	);
};
export default Order;
