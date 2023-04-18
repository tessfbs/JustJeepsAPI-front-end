import Navbar from './features/navbar/Navbar.jsx';
import OrdersList from './features/order/OrdersList.jsx';
import OrderProductList from './features/order/OrderProductList.jsx';
import OrderTable from './features/order/OrderTable.jsx';
import Testing from './features/order/testing.jsx';
import { Route, Routes } from 'react-router-dom';
import { SupplierTable } from './features/supplier/SupplierTable.jsx';
import { DashBoard } from './features/dashboard/DashBoard.jsx';
import { PoForm } from './features/po/PoForm.jsx';
import { Items } from './features/items/Items.jsx';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<OrderTable />} />
				<Route path='/orders' element={<OrderTable />} />
				<Route path='/suppliers' element={<SupplierTable />} />
				<Route path='/dashboard' element={<DashBoard />} />
				<Route path='/po' element={<PoForm />} />
				<Route path='/items' element={<Items />} />
			</Routes>
		</>
	);
}

export default App;
