import Order from './Order';
import { useSelector } from 'react-redux';

const OrdersList = () => {
	const { orders } = useSelector(store => store.order);

	return (
		<div className='container-fluid mt-3'>
			<table className='table table-hover table-striped'>
				<thead>
					<tr>
						<th scope='col'>Order_id</th>
						<th scope='col'>Created_Date</th>
						<th scope='col'>Email</th>
						<th scope='col'>Firstname</th>
						<th scope='col'>Lastname</th>
						<th scope='col'>Total</th>
						<th scope='col'>increment_id</th>
						<th scope='col'>Total_Qty</th>
						<th scope='col'>View</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => {
						return <Order key={order.entity_id} {...order} />;
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersList;
