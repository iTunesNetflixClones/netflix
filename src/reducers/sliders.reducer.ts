// @Vendors
import produce from 'immer';

// @Action types
import {
  SLIDER_OPEN_DESCRIPTIONS,
  SLIDER_REGISTER_SLIDER,
  SLIDER_UNREGISTER_SLIDER
} from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';
import { SlidersState } from 'constants/stateTypes';

const initialState = (): SlidersState => ({
  currentSliderId: undefined,
  registeredSliders: []
});

const slidersReducer = produce((nextState: SlidersState, action: Action): SlidersState => {
  switch(action.type) {
    case SLIDER_OPEN_DESCRIPTIONS:
      nextState.currentSliderId = action.payload.sliderId;
      return nextState;
    case SLIDER_REGISTER_SLIDER:
      nextState.registeredSliders = [
        ...nextState.registeredSliders,
        { sliderId: action.payload.sliderId, text: action.payload.text, ref: action.payload.ref }
      ];
      return nextState;
    case SLIDER_UNREGISTER_SLIDER:
        nextState.registeredSliders = nextState.registeredSliders
          .filter(slider => slider.sliderId !== action.payload.sliderId);
        return nextState;
    default:
      return nextState;
  }
}, initialState());

export default slidersReducer;