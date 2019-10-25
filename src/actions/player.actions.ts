// @Action types
import  {
  PLAYER_REQUEST_CONTROL
} from '../constants/actionTypes';

const requestPlayerControl = (playerId: string) => ({ type: PLAYER_REQUEST_CONTROL, payload: { playerId } });

export {
  requestPlayerControl
};