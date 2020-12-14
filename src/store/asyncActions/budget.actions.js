/* eslint-disable import/prefer-default-export */
import {
  getListBudgetsSuccess,
  getReceiptsByBudgetSuccess,
  editBudgetSuccess,
  createBudgetSuccess
} from '../reducers/budgets.reducer';
import { setError, setLoading, setMessage } from '../reducers/ui.reducer';
import axiosInstance from '../../axiosInstance';
import routeEnum from '../../axiosInstance/apiRoute';

export const fetchListBudgets = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const budgets = await axiosInstance.get(routeEnum.BUDGETS, { params });
    dispatch(setLoading(false));
    dispatch(getListBudgetsSuccess(budgets));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get list budgets fail'));
  }
};

export const getReceiptsByBudget = (
  id
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const receipts = await axiosInstance.get(`${routeEnum.BUDGETS}${id}`);
    dispatch(setLoading(false));
    dispatch(getReceiptsByBudgetSuccess(receipts));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get receipts by budget fail'));
  }
};

export const editBudget = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const budget = await axiosInstance.put(`${routeEnum.BUDGETS}${params.id}`, { params });
    dispatch(setLoading(false));
    dispatch(editBudgetSuccess(budget));
    dispatch(setMessage('edit budget success'));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('edit budget fail'));
  }
};

export const deleteBudget = (
  id
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance.delete(`${routeEnum.BUDGETS}${id}`);
    dispatch(setLoading(false));
    dispatch(setMessage('delete budget success'));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('delete budget fail'));
  }
};

export const createBudget = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const budget = await axiosInstance.post(routeEnum.BUDGETS, { params });
    dispatch(setLoading(false));
    dispatch(createBudgetSuccess(budget));
    dispatch(setMessage('add budget success'));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('add budget fail'));
  }
};
