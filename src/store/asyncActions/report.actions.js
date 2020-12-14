/* eslint-disable import/prefer-default-export */
import {
  getReportByWeekSuccess,
  getReportByCategorySuccess
} from '../reducers/reports.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';
import axiosInstance from '../../axiosInstance';
import routeEnum from '../../axiosInstance/apiRoute';

export const fetchReportByWeek = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const reportByWeek = await axiosInstance.get(`${routeEnum.REPORT}byweek`, { params });
    dispatch(setLoading(false));
    dispatch(getReportByWeekSuccess(reportByWeek));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get ReportByWeek fail'));
  }
};

export const fetchReportByCategory = (
  params
) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const reportByCategory = await axiosInstance.get(`${routeEnum.CATEGORIES}bycategory`, { params });
    dispatch(setLoading(false));
    dispatch(getReportByCategorySuccess(reportByCategory));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get ReportByCategory fail'));
  }
};
