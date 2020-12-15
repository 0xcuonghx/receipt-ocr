/* eslint-disable import/prefer-default-export */
import {
  getReportByWeekSuccess,
  getReportByCategorySuccess
} from '../reducers/reports.reducer';
import { setError, setLoading } from '../reducers/ui.reducer';
import axiosInstance from '../../axiosInstance';
import routeEnum from '../../axiosInstance/apiRoute';
import dateUtils from '../../utils/dateUtils';

export const fetchReportByWeek = (
  params
) => async (dispatch) => {
  try {
    const query = {
      toDate: dateUtils.isoEndOfMonth(),
      fromDate: dateUtils.isoStartOfMonth(),
      ...params
    };
    dispatch(setLoading(true));
    const reportByWeek = await axiosInstance.get(`${routeEnum.REPORT}byweek`, { params: query });
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
    const query = {
      toDate: dateUtils.isoEndOfMonth(),
      fromDate: dateUtils.isoStartOfMonth(),
      ...params
    };
    dispatch(setLoading(true));
    const reportByCategory = await axiosInstance.get(`${routeEnum.REPORT}bycategory`, { params: query });
    dispatch(setLoading(false));
    dispatch(getReportByCategorySuccess(reportByCategory));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError('Get ReportByCategory fail'));
  }
};
