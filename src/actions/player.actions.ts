// @Action types
import  {
  PLAYER_ENABLE,
  PLAYER_REQUEST_CONTROL
} from '../constants/actionTypes';

// @Constants
import { Action } from 'constants/types';

const requestPlayerControl = (playerId: string): Action => ({
  type: PLAYER_REQUEST_CONTROL,
  payload: { playerId }
});

const enablePlayers = (): Action => ({
  type: PLAYER_ENABLE,
  payload: {}
});

export {
  enablePlayers,
  requestPlayerControl
};