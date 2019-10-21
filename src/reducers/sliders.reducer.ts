// @Vendors
import produce from 'immer';

// @Action types
import {
  SLIDER_OPEN_DESCRIPTIONS
} from '../constants/actionTypes';

// @Constants
import { Action } from '../constants/types';
import { SlidersState } from '../constants/stateTypes';

const initialState = (): SlidersState => ({
  currentSliderId: undefined
});

const slidersReducer = produce((nextState: SlidersState, action: Action): SlidersState => {
  switch(action.type) {
    case SLIDER_OPEN_DESCRIPTIONS:
      nextState.currentSliderId = action.payload.sliderId;
      return nextState;
    default:
      return nextState;
  }
}, initialState());

export default slidersReducer;