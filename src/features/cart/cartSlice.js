import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemByUserId } from './cartAPI'; // Import the addToCart function from cartAPI

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
export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId); // Call addToCart function with the item
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
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload; // Push the payload (added item) to the items array
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index ,1); // Push the payload (added item) to the items array
      });
  },
});

// Export actions and selectors
export const { increment } = cartSlice.actions;
export const selectCount = (state) => state.cart.value; // Update to cart.value
export const selectItems = (state) => state.cart.items; // New selector to get items

export default cartSlice.reducer;
