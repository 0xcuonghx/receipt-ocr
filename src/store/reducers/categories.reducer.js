/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  detail: {}
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getListCategoriesSuccess: (state, action) => {
      state.data = action.payload;
    },
    editCategorySuccess: (state, action) => {
      state.detail = action.payload;
    },
    createCategorySuccess: (state, action) => {
      state.detail = action.payload;
    }
  },
});

export const {
  getListCategoriesSuccess,
  editCategorySuccess,
  createCategorySuccess
} = categorySlice.actions;
export default categorySlice.reducer;
