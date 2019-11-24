// @Vendors
import { Dispatch } from 'redux';

// @Action types
import  { PODCAST_GET_FEATURED, PODCASTS_GET_SLIDERS_DATA } from 'constants/actionTypes';

// @Constants
import { Action, SliderCategory, PodcastEntry } from 'constants/types';
import { VIDEO_SLIDER_CATEGORIES } from 'constants/constants';

// @Utils
import { filterByCategory, mapPodcasts, mapFeaturedPodcast } from 'utils/feedUtils';

export const getSlidersData = () => (dispatch: Dispatch): Action => {
  const podcastsData = mapPodcasts();
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
};

export const getFeaturedPodcastData = () => (dispatch: Dispatch): Action => {
  const featuredPodcastData = mapFeaturedPodcast();

  return dispatch({
    type: PODCAST_GET_FEATURED,
    payload: { featuredPodcastData }
  });
};
