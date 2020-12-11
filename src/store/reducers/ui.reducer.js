/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  message: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearSnackBar: (state) => {
      state.error = null;
      state.message = null;
    }
  },
});

export const {
  setLoading, setError, setMessage, clearSnackBar
} = uiSlice.actions;
export default uiSlice.reducer;
