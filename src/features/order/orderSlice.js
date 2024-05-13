import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchOrderById } from './OrderAPI';

const initialState = {
  status: 'idle',
  orders: [],
  currentOrder : [],
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderInfo) => {
    const response = await createOrder(orderInfo);
    return response.data;
  }
);
export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchedOrderById",
  async (orderId) => {
    const response = await fetchOrderById(orderId);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload); // Push the payload to orders array
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentOrder = action.payload;
      });
  },
  
  
});

export const { increment } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder; 


export default orderSlice.reducer;
