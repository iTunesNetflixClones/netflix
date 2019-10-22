// @Action types
import  {
  PLAYER_REQUEST_CONTROL
} from '../constants/actionTypes';

const requestPlayerControl = (playerId: string) => (dispatch: Function): void => {
  dispatch({ type: PLAYER_REQUEST_CONTROL, payload: { playerId } });
};

export {
  requestPlayerControl
};