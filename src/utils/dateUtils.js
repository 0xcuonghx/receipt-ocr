import moment from 'moment';

function getCurrentMonthByUnix() {
  return moment().startOf('month').unix();
}

function getNextMonthByUnix(unix) {
  return moment
    .unix(unix)
    .add(1, 'months')
    .startOf('month')
    .unix();
}

function getPreviousMonthByUnix(unix) {
  return moment
    .unix(unix)
    .subtract(1, 'months')
    .startOf('month')
    .unix();
}

function isoStartOfMonth() {
  return moment().startOf('month').toISOString();
}
function isoEndOfMonth() {
  return moment().endOf('month').toISOString();
}

function isoToDate(iso) {
  try {
    return moment(iso).format('DD-MM-YYYY');
  } catch (error) {
    return 'NaN';
  }
}
export default {
  getCurrentMonthByUnix,
  getNextMonthByUnix,
  getPreviousMonthByUnix,
  isoStartOfMonth,
  isoEndOfMonth,
  isoToDate
};
