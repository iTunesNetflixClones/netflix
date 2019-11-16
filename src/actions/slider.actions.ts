// @Vendors
import { RefObject } from 'react';

// @Action types
import  {
  SLIDER_OPEN_DESCRIPTIONS,
  SLIDER_REGISTER_SLIDER,
  SLIDER_UNREGISTER_SLIDER
} from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';

const openSlider = (sliderId: string): Action => ({
  type: SLIDER_OPEN_DESCRIPTIONS,
  payload: { sliderId }
});

const registerSlider = (sliderId: string, text: string, ref: RefObject<any>): Action => ({
  type: SLIDER_REGISTER_SLIDER,
  payload: { sliderId, text, ref }
});

const unregisterSlider = (sliderId: string): Action => ({
  type: SLIDER_UNREGISTER_SLIDER,
  payload: { sliderId }
});

export {
  openSlider,
  registerSlider,
  unregisterSlider
};