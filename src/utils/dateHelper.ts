// @Constants
import { Duration } from 'constants/types';
import { DURATION_SEPARATOR } from 'constants/constants';

export const formatDuration = (timeInMs: number): Duration => {
  const hours: number = Math.floor(timeInMs / (60000 * 60));
  const mins: number = Math.floor(timeInMs % (60000 * 60) / 60000);
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

export const getDurationInMilis = (duration?: string | number): number => {
  if(!duration) {
    return 0;
  }

  if(typeof duration === 'string') {
    const [mins, secs, ms] = duration.split(DURATION_SEPARATOR);
    return parseInt(mins, 10) * 60000 + parseInt(secs, 10) * 1000 + parseInt(ms, 10);
  }

  return duration as number;
};