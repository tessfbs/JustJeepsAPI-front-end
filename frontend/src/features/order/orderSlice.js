import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import orders from '../../../orders';
import orderProducts from '../../../orderProducts';

const initialState = {
	orders: orders,
	orderProducts: orderProducts,
	amount: 0,
	total: 0,
	isLoading: true,
};

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addOrderProduct: (state, action) => {
			state.orderProducts.push(action.payload); // add new order product to the orderProducts array
		},
	},
});

// console.log(orderSlice);

export default orderSlice.reducer;
