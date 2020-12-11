/* eslint-disable import/prefer-default-export */
import { getListBudgetsSuccess } from '../reducers/budgets.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';
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
