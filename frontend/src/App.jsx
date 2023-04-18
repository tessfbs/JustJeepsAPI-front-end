import Navbar from './features/navbar/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersList from './features/order/OrdersList.jsx';
import OrderProductList from './features/order/OrderProductList.jsx';
import OrderTable from './features/order/OrderTable.jsx';
import Testing from './features/order/testing.jsx';
import { Route, Routes } from 'react-router-dom';
import { SupplierTable } from './features/supplier/SupplierTable.jsx';
import { DashBoard } from './features/dashboard/DashBoard.jsx';
import { DashBoardPO } from './features/dashboard/DashBoardPO.jsx';
import { PoForm } from './features/po/PoForm.jsx';
import { Items } from './features/items/Items.jsx';

function App() {

  const [data, setData] = useState('');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data'); // Use Axios to send GET request to /api/data
        const responseData = response.data;
        console.log('Data from backend:', responseData);
        // Process the response data from backend if needed
        setData(responseData);
      } catch (error) {
        console.error('Failed to fetch data from backend:', error);
      }
    };
    fetchDataFromBackend();
  }, []);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<OrderTable />} />
				<Route path='/orders' element={<OrderTable />} />
				<Route path='/suppliers' element={<SupplierTable />} />
				{/* <Route path='/dashboard' element={<DashBoard />} /> */}
        <Route path='/dashboard'>
          <Route index element={<DashBoard/>}/>
          <Route path='po' element={<DashBoardPO/>}/>
        </Route>
				<Route path='/po' element={<PoForm />} />
				<Route path='/items' element={<Items />} />
			</Routes>
		</>
	);
}

export default App;
