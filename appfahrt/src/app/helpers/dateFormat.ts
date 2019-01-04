import {current} from 'codelyzer/util/syntaxKind';
import * as moment from 'moment';

export const getTimeFromTimestamp = (date: number) => {
  return moment(date).format('HH:mm');
}
export const getTimeDifferenceFromTimestamp = (diff: number) => {
  const min = Math.round(diff / 1000 / 60);
  return String(min) + 'min';
}
