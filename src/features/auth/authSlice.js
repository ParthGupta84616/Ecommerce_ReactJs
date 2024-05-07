import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from './AuthAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      // Assuming loggedInUser is a count or something that can be incremented
      state.loggedInUser += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectLoggedUser = (state) => state.user.loggedInUser;

export default userSlice.reducer;
