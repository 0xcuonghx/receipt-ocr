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

export default {
  getCurrentMonthByUnix,
  getNextMonthByUnix,
  getPreviousMonthByUnix
};
