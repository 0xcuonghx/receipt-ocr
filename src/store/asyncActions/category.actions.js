import {
  getListCategoriesSuccess,
  editCategorySuccess,
  createCategorySuccess
} from '../reducers/categories.reducer';
import { setError, setLoading, setMessage } from '../reducers/ui.reducer';
import axiosInstance from '../../axiosInstance';
import routeEnum from '../../axiosInstance/apiRoute';

export const fetchListCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const categories = await axiosInstance.get(routeEnum.CATEGORIES);
    dispatch(setLoading(false));
    dispatch(getListCategoriesSuccess(categories));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get list categories fail'));
  }
};

export const editCategory = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = {
      icon: params.icon,
      name: params.name
    };
    const budget = await axiosInstance.put(`${routeEnum.CATEGORIES}${params.id}`, query);
    dispatch(setLoading(false));
    dispatch(editCategorySuccess(budget));
    dispatch(setMessage('edit category success'));
    dispatch(fetchListCategories());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('edit category fail'));
  }
};

export const deleteCategory = (
  id
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axiosInstance.delete(`${routeEnum.CATEGORIES}${id}`);
    dispatch(setLoading(false));
    dispatch(setMessage('delete category success'));
    dispatch(fetchListCategories());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('delete category fail - still have receipt'));
  }
};

export const createCategory = (
  params
) => async (dispatch) => {
  try {
    const query = {
      icon: params.icon,
      name: params.name
    };
    dispatch(setLoading(true));
    const category = await axiosInstance.post(routeEnum.CATEGORIES, query);
    dispatch(setLoading(false));
    dispatch(createCategorySuccess(category));
    dispatch(setMessage('add category success'));
    dispatch(fetchListCategories());
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('add category fail'));
  }
};
