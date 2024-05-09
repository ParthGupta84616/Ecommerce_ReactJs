import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemByUserId } from './cartAPI'; // Import the addToCart function from cartAPI

const initialState = {
  value: 0,
  status: 'idle',
  items: [], // Initialize items array in initialState
};

// Define the async thunk to add item to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item); // Call addToCart function with the item
    return response.data;
  }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (userId) => {
    const response = await fetchItemByUserId(userId); // Call addToCart function with the item
    return response.data;
  }
);

// Create the cart slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload); // Push the payload (added item) to the items array
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload; // Push the payload (added item) to the items array
      });
  },
});

// Export actions and selectors
export const { increment } = cartSlice.actions;
export const selectCount = (state) => state.cart.value; // Update to cart.value
export const selectItems = (state) => state.cart.items; // New selector to get items

export default cartSlice.reducer;
