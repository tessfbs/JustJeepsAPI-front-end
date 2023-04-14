import Order from './Order';
import { useSelector } from 'react-redux';

const OrdersList = () => {
	const { orders, total, amount } = useSelector(store => store.order);

	if (total < 1) {
		return (
			<section>
				<h5 className='text-center'>No Orders Available</h5>
			</section>
		);
	}
	return (
		<section>
			<table class='table'>
				<thead>
					<tr>
						<th scope='col'>entity_id</th>
						<th scope='col'>created_at</th>
						<th scope='col'>customer_email</th>
						<th scope='col'>customer_firstname</th>
						<th scope='col'>customer_lastname</th>
						<th scope='col'>grand_total</th>
						<th scope='col'>increment_id</th>
						<th scope='col'>order_currency_code</th>
						<th scope='col'>total_qty_ordered</th>
						<th scope='col'>coupon_code</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(() => {})}
					<tr>
						<th scope='row'>1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};

export default OrdersList;
