// @Constants
import {
  CALC_INTERPOLATION_FULL_PERCENT,
  CALC_INTERPOLATION_MAX_RANGE_DEFAULT,
  CALC_INTERPOLATION_MIN_DEFAULT,
  CALC_INTERPOLATION_MIN_RANGE_DEFAULT
} from '../constants/constants';

export const interpolateScroll = ({
  scrollPos,
  acceleration,
  minValue=CALC_INTERPOLATION_MIN_DEFAULT,
  rangeMax=CALC_INTERPOLATION_MAX_RANGE_DEFAULT,
  rangeMin=CALC_INTERPOLATION_MIN_RANGE_DEFAULT
} : {
  scrollPos: number,
  acceleration : number,
  minValue?: number,
  rangeMax?: number,
  rangeMin?: number
}) : number => {
  const interpolatedValue : number = scrollPos ? CALC_INTERPOLATION_FULL_PERCENT / (scrollPos * acceleration) : rangeMax;
  return Math.min(interpolatedValue > minValue ? interpolatedValue : rangeMin, rangeMax);
};
