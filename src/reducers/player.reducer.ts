// @Vendors
import produce from 'immer';

// @Action types
import {
  PLAYER_ENABLE,
  PLAYER_REQUEST_CONTROL
} from '../constants/actionTypes';

// @Constants
import { Action } from '../constants/types';
import { PlayerState } from '../constants/stateTypes';

const initialState = (): PlayerState => ({
  currentPlayingId: undefined,
  playingEnabled: false
});

const slidersReducer = produce((nextState: PlayerState, action: Action): PlayerState => {
  switch(action.type) {
    case PLAYER_ENABLE:
      nextState.playingEnabled = true;
      return nextState;
    case PLAYER_REQUEST_CONTROL:
      nextState.currentPlayingId = action.payload.playerId;
      return nextState;
    default:
      return nextState;
  }
}, initialState());

export default slidersReducer;