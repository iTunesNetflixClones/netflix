// @Vendors
import produce from 'immer';

// @Action types
import { PODCAST_GET_FEATURED, PODCASTS_GET_SLIDERS_DATA } from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';
import { PodcastsState } from 'constants/stateTypes';

const initialState = (): PodcastsState => ({
  featuredPodcastData: undefined,
  slidersData: []
});

const podcastsReducer = produce((nextState: PodcastsState, action: Action): PodcastsState => {
  switch(action.type) {
    case PODCAST_GET_FEATURED:
      nextState.featuredPodcastData = action.payload.featuredPodcastData;
      return nextState;
    case PODCASTS_GET_SLIDERS_DATA:
      nextState.slidersData = action.payload.slidersData;
      return nextState;
    default:
      return nextState;
  }
}, initialState());

export default podcastsReducer;