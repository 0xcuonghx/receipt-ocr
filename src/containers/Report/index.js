import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReportComponent from '../../components/Report';
import { fetchReportByCategory, fetchReportByWeek } from '../../store/asyncActions/report.actions';

export default function Report() {
  const dispatch = useDispatch();
  const reportReducer = useSelector((state) => state.reportReducer);

  const fetchByWeek = React.useCallback((params) => {
    dispatch(fetchReportByCategory(params));
  }, [dispatch]);

  const fetchByCategory = React.useCallback((params) => {
    dispatch(fetchReportByWeek(params));
  }, [dispatch]);

  React.useEffect(() => {
    fetchByWeek();
  }, [fetchByWeek]);

  React.useEffect(() => {
    fetchByCategory();
  }, [fetchByCategory]);

  return (
    <ReportComponent
      fetchByWeek={fetchByWeek}
      fetchByCategory={fetchByCategory}
      dataByWeek={reportReducer.reportByWeek}
      reportByCategory
      dataByCategory={reportReducer.reportByCategory}
    />
  );
}
