// @Constants
import { Duration } from 'constants/types';
import { DATE_FORMAT, DURATION_SEPARATOR } from 'constants/constants';
import moment, { Moment } from 'moment';

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60000;
const HOUR_IN_MS = 60000 * 60;

export const formatDuration = (timeInMs: number): Duration => {
  const hours: number = Math.floor(timeInMs / HOUR_IN_MS);
  const mins: number = Math.floor(timeInMs % (HOUR_IN_MS) / MINUTE_IN_MS);
  if(hours) {
    return {
      values:[hours, mins],
      textKey: 'duration-fullTime'
    };
  }
  return {
    values:[mins],
    textKey: 'duration-onlyMins'
  };
};

export const getDurationInMillis = (duration?: string | number): number => {
  if(!duration) {
    return 0;
  }

  if(typeof duration === 'string') {
    const [hours, mins, secs] = duration.split(DURATION_SEPARATOR);
    return parseInt(hours, 10) * HOUR_IN_MS + parseInt(mins, 10) * MINUTE_IN_MS + parseInt(secs, 10) * SECOND_IN_MS;
  }

  return duration as number;
};

export const getDateObject = (dateString: string): Moment => (
  moment(dateString, DATE_FORMAT)
);
