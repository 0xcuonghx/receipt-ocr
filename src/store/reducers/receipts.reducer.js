/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  detail: {},
};

const receiptReducer = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    getListReceiptSuccess: (state, action) => {
      state.data = action.payload;
    },
    getDetailReceiptSuccess: (state, action) => {
      state.detail = action.payload;
    },
    createReceiptSuccess: (state, action) => {
      state.detail = action.payload;
    },
    editReceiptSuccess: (state, action) => {
      state.detail = action.payload;
    },
    uploadDataSuccess: (state, action) => {
      state.detail = action.payload;
    }
  },
});

export const {
  getListReceiptSuccess,
  getDetailReceiptSuccess,
  createReceiptSuccess,
  editReceiptSuccess,
  uploadDataSuccess
} = receiptReducer.actions;

export default receiptReducer.reducer;
