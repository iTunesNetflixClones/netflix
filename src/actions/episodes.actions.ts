// @Vendors
import { Dispatch } from 'redux';

// @Action types
import  { EPISPDES_SET_EPISODE_DATA } from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';

// @Utils
import { mapEpisodes } from 'utils/feedUtils';

export const getEpisodes = (podcastId: string) => (dispatch: Dispatch): Action => {
  const episodesData = mapEpisodes(podcastId);
  return dispatch({
    type: EPISPDES_SET_EPISODE_DATA,
    payload: { episodesData }
  });
};
