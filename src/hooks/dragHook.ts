// @Constants
import { VIDEO_SLIDER_SCROLL_OFFSET_COEF } from 'constants/constants';
import { Coordinates, FullGestureState } from 'react-use-gesture/dist/types';

interface HookParams {
  scrollBackAllowed: boolean;
  scrollForwardAllowed: boolean;
  scrollIsBlocked: boolean;
}

const dragScrollBindCreator = (
  { scrollBackAllowed, scrollForwardAllowed, scrollIsBlocked }: HookParams,
  hookGenerator: (callback: Function) => Function,
  onScroll: (isBack: boolean) => void,
): Function => {
  return hookGenerator((eventData: FullGestureState<Coordinates>): void => {
    if(scrollIsBlocked) {
      return;
    }
    const scrollLeft = eventData.movement[0] > VIDEO_SLIDER_SCROLL_OFFSET_COEF && scrollBackAllowed;
    const scrollRight = eventData.movement[0] < -VIDEO_SLIDER_SCROLL_OFFSET_COEF && scrollForwardAllowed;

    if(scrollLeft || scrollRight) {
      onScroll(scrollLeft);
    }
  });
};

export default dragScrollBindCreator;