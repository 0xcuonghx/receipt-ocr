/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  reportByWeek: [],
  reportByCategory: []
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    getReportByWeekSuccess: (state, action) => {
      state.reportByWeek = action.payload;
    },
    getReportByCategorySuccess: (state, action) => {
      state.reportByCategory = action.payload;
    },
  },
});

export const {
  getReportByWeekSuccess,
  getReportByCategorySuccess
} = reportSlice.actions;
export default reportSlice.reducer;
