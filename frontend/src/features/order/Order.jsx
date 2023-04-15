const Order = () => {
	const {
		entity_id,
		created_at,
		customer_email,
		coupon_code,
		customer_firstname,
		customer_lastname,
		grand_total,
		increment_id,
		order_currency_code,
		total_qty_ordered,
	} = order;

	return (
		<tr>
			<th scope='row'>${entity_id}</th>
			<td>${created_at}</td>
			<td>${customer_email}</td>
			<td>${customer_firstname}</td>
			<td>${customer_lastname}</td>
			<td>${grand_total}</td>
			<td>${increment_id}</td>
			<td>${order_currency_code}</td>
			<td>${total_qty_ordered}</td>
			<td>${coupon_code}</td>
		</tr>
	);
};
export default Order;
