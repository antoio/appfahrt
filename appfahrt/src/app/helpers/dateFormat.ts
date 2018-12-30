import * as moment from 'moment';

export const getTimeFromTimestamp = (date: number) => {
  return moment(date).format('HH:mm');
}
