import moment from 'moment';

export const checkDueDate = function(date) {
  return moment(date).diff(moment(), 'd') < 8;
};
