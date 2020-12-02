/* eslint-disable import/prefer-default-export */
import { getListBudgetsSuccess } from '../reducers/budgets.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';

export const fetchListBudgets = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // TODO: axios call
    // const budgets = await ;
    const budgets = [];
    dispatch(setLoading(false));
    dispatch(getListBudgetsSuccess(budgets));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get list budgets fail'));
  }
};
