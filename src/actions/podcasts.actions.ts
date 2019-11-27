// @Vendors
import { Dispatch } from 'redux';

// @Action types
import  {
  PODCAST_GET_FEATURED,
  PODCAST_GET_FEATURED_ERR,
  PODCASTS_GET_SLIDERS_DATA,
  PODCASTS_GET_SLIDERS_DATA_ERR,
  PODCAST_THUMBS_DOWN,
  PODCAST_THUMBS_UP
} from 'constants/actionTypes';

// @Constants
import { Action, SliderCategory, PodcastEntry } from 'constants/types';
import { VIDEO_SLIDER_CATEGORIES } from 'constants/constants';

// @Utils
import { filterByCategory, mapPodcasts, mapFeaturedPodcast } from 'utils/feedUtils';
import { localFetch } from 'utils/fetchUtils';

export const getSlidersData = () => (dispatch: Dispatch): Promise<Action> => {
  return Promise.all([localFetch('/resources/podcasts.json'), localFetch('/resources/episodes.json')])
    .then(data => {
      const podcastsData = mapPodcasts(data[0], data[1]);
      const slidersData = VIDEO_SLIDER_CATEGORIES.map((category: SliderCategory, index: number): PodcastEntry => ({
        sliderId: `${index.toString()}-${category.sliderKey}`,
        podcastsData: filterByCategory(category.searchKey, podcastsData),
        sliderTitleKey: `podcastSliderCategories-${category.sliderKey}`,
        anchorTextKey: `podcastSliderCategories-${category.sliderShortKey}`
      }));

      return dispatch({
        type: PODCASTS_GET_SLIDERS_DATA,
        payload: { slidersData }
      });
    })
    .catch(error => {
      return dispatch({
        type: PODCASTS_GET_SLIDERS_DATA_ERR,
        payload: { error }
      });
    });
};

export const getFeaturedPodcastData = () => (dispatch: Dispatch): Promise<Action> => {
  return Promise.all([localFetch('/resources/featured.json'), localFetch('/resources/episodes.json')])
    .then(data => {
      const featuredPodcastData = mapFeaturedPodcast(data[0], data[1]);

      return dispatch({
        type: PODCAST_GET_FEATURED,
        payload: { featuredPodcastData }
      });
    })
    .catch(error => {
      return dispatch({
        type: PODCAST_GET_FEATURED_ERR,
        payload: { error }
      });
    });
};

export const thumbsDownPodcast = (podcastId: string) => (dispatch: Dispatch): Action => {
  return dispatch({
    type: PODCAST_THUMBS_DOWN,
    payload: { podcastId }
  });
};

export const thumbsUpPodcast = (podcastId: string) => (dispatch: Dispatch): Action => {
  return dispatch({
    type: PODCAST_THUMBS_UP,
    payload: { podcastId }
  });
};
