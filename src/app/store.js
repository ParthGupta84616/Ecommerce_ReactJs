import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productListSlice';
import userReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    product: productReducer ,
    user : userReducer
  },
});
