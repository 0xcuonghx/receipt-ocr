/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  detail: {}
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    getListBudgetsSuccess: (state, action) => {
      state.data = action.payload;
    },
    editBudgetSuccess: (state, action) => {
      state.detail = action.payload;
    },
    createBudgetSuccess: (state, action) => {
      state.detail = action.payload;
    }
  },
});

export const {
  getListBudgetsSuccess,
  editBudgetSuccess,
  createBudgetSuccess
} = budgetSlice.actions;
export default budgetSlice.reducer;
