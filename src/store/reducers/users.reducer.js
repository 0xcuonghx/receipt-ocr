/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const initialState = { isAuthenticate: false, user: null, auth: null };
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        displayName: action.payload?.displayName || '',
        email: action.payload?.email || '',
        firstName: action.payload?.firstName || '',
        lastName: action.payload?.lastName || '',
        photoURL: action.payload?.photoURL || '',
      };
      state.auth = action.payload.auth;
      state.isAuthenticate = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticate = false;
      state.user = null;
      state.auth = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
