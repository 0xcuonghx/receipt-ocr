/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import {
  getListBudgetsSuccess,
  editBudgetSuccess,
  createBudgetSuccess
} from '../reducers/budgets.reducer';
import { setError, setLoading, setMessage } from '../reducers/ui.reducer';
import axiosInstance from '../../axiosInstance';
import routeEnum from '../../axiosInstance/apiRoute';
import dateUtils from '../../utils/dateUtils';

export const fetchListBudgets = (
  params
) => async (dispatch) => {
  try {
    const query = {
      toDate: dateUtils.isoEndOfMonth(),
      fromDate: dateUtils.isoStartOfMonth(),
      ...params
    };
    dispatch(setLoading(true));
    const budgets = await axiosInstance.get(routeEnum.BUDGETS, { params: query });
    dispatch(setLoading(false));
    dispatch(getListBudgetsSuccess(budgets));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get list budgets fail'));
  }
};

export const editBudget = (
  params
) => async (dispatch) => {
  try {
    const query = {
      id: params.id,
      category_id: params.category_id,
      fromDate: moment(params.fromDate).toISOString(),
      toDate: moment(params.toDate).toISOString(),
      among: Number(params.among)
    };
    dispatch(setLoading(true));
    const budget = await axiosInstance.put(`${routeEnum.BUDGETS}${query.id}`, query);
    dispatch(setLoading(false));
    dispatch(editBudgetSuccess(budget));
    dispatch(setMessage('edit budget success'));
    dispatch(fetchListBudgets());
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
    dispatch(fetchListBudgets());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('delete budget fail'));
  }
};

export const createBudget = (
  params
) => async (dispatch) => {
  try {
    const query = {
      category_id: params.category_id,
      fromDate: moment(params.fromDate).toISOString(),
      toDate: moment(params.toDate).toISOString(),
      among: Number(params.among)
    };
    dispatch(setLoading(true));
    const budget = await axiosInstance.post(routeEnum.BUDGETS, query);
    dispatch(setLoading(false));
    dispatch(createBudgetSuccess(budget));
    dispatch(setMessage('add budget success'));
    dispatch(fetchListBudgets());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('add budget fail'));
  }
};
