import Navbar from './features/navbar/Navbar.jsx';
import OrdersList from './features/order/OrdersList.jsx';
import OrderProductList from './features/order/OrderProductList.jsx';
import OrderTable from './features/order/OrderTable.jsx';
import Testing from './features/order/testing.jsx';
function App() {
	return (
		<main>
			<Navbar />
			{/* <Testing /> */}
			<OrderTable />
		</main>
	);
}

export default App;
