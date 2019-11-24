// @Vendors
import { RefObject } from 'react';
import { Dispatch } from 'redux';

// @Action types
import  {
  SLIDER_CLEAR_PODCAST_ID,
  SLIDER_OPEN_FEATURED,
  SLIDER_OPEN_DESCRIPTIONS,
  SLIDER_REGISTER_SLIDER,
  SLIDER_UNREGISTER_SLIDER
} from 'constants/actionTypes';

// @Constants
import { Action, ActionSimple } from 'constants/types';
import { StoreState } from 'constants/stateTypes';
import { FEATURED_PODCAST_SCROLL_DELAY } from 'constants/constants';

// @Utils
import { findPodcastInSliders, getPodcastIndex, scrollToPodcast } from 'utils/podcastHelper';

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

const goToFeaturedPoscast = (podcastId: string) => (
  dispatch: Dispatch, getState: () => StoreState
): Action | undefined => {
  const sliderData = findPodcastInSliders(podcastId, getState().podcastsReducer.slidersData);

  if(!sliderData) {
    return;
  }

  const podcastIndex = getPodcastIndex(podcastId, sliderData.podcastsData);

  setTimeout(() => {
    scrollToPodcast(sliderData.sliderId, getState().slidersReducer.registeredSliders);
  }, FEATURED_PODCAST_SCROLL_DELAY);

  return dispatch({
    type: SLIDER_OPEN_FEATURED,
    payload: { sliderId: sliderData.sliderId, podcastIndex }
  });
};

const clearSelectedPodcastIndex = () => (dispatch: Dispatch): ActionSimple => {
  return dispatch({
    type: SLIDER_CLEAR_PODCAST_ID,
  });
};

export {
  clearSelectedPodcastIndex,
  goToFeaturedPoscast,
  openSlider,
  registerSlider,
  unregisterSlider
};