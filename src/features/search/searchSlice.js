import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearchedProducts } from './searchAPI';

const initialState = {
  value: 0,
  status: 'idle',
  products: null,
};

export const fetchSearchedProductsAsync = createAsyncThunk(
  "search/fetchSearchedProducts",
  async (query) => {
    const response = await fetchSearchedProducts(query);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchedProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const { increment } = searchSlice.actions;
export const selectCount = (state) => state.search.value;
export const selectSearchedProducts = (state) => state.search.products;

export default searchSlice.reducer;