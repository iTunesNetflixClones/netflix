// @Action types
import  {
  SLIDER_OPEN_DESCRIPTIONS
} from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';

const openSlider = (sliderId: string): Action => ({
  type: SLIDER_OPEN_DESCRIPTIONS,
  payload: { sliderId }
});

export {
  openSlider
};