// @Vendors
import produce from 'immer';

// @Action types
import {
  PODCAST_GET_FEATURED,
  PODCASTS_GET_SLIDERS_DATA,
  PODCAST_THUMBS_DOWN,
  PODCAST_THUMBS_UP
} from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';
import { PodcastsState } from 'constants/stateTypes';

const initialState = (): PodcastsState => ({
  featuredPodcastData: undefined,
  slidersData: [],
  thumbsUp: [],
  thumbsDown: []
});

const podcastsReducer = produce((nextState: PodcastsState, action: Action): PodcastsState => {
  switch(action.type) {
    case PODCAST_GET_FEATURED:
      nextState.featuredPodcastData = action.payload.featuredPodcastData;
      return nextState;
    case PODCASTS_GET_SLIDERS_DATA:
      nextState.slidersData = action.payload.slidersData;
      return nextState;
    case PODCAST_THUMBS_UP:
      nextState.thumbsUp = nextState.thumbsUp.includes(action.payload.podcastId) ?
        nextState.thumbsUp : [...nextState.thumbsUp, action.payload.podcastId];
      nextState.thumbsDown = nextState.thumbsDown.filter((podcastId: string) => podcastId !== action.payload.podcastId);
      return nextState;
    case PODCAST_THUMBS_DOWN:
      nextState.thumbsDown = nextState.thumbsDown.includes(action.payload.podcastId) ?
        nextState.thumbsDown : [...nextState.thumbsDown, action.payload.podcastId];
      nextState.thumbsUp = nextState.thumbsUp.filter((podcastId: string) => podcastId !== action.payload.podcastId);
      return nextState;
    default:
      return nextState;
  }
}, initialState());

export default podcastsReducer;