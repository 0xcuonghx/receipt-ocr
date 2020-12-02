/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    getListBudgetsSuccess: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { getListBudgetsSuccess } = budgetSlice.actions;
export default budgetSlice.reducer;
