// @Action types
import  {
  SLIDER_OPEN_DESCRIPTIONS
} from '../constants/actionTypes';

const openSlider = (sliderId: string) => (dispatch: Function): void => {
  dispatch({ type: SLIDER_OPEN_DESCRIPTIONS, payload: { sliderId } });
};

export {
  openSlider
};