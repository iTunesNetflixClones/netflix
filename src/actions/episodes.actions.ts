// @Vendors
import { Dispatch } from 'redux';

// @Action types
import  { EPISPDES_SET_EPISODE_DATA, EPISPDES_SET_EPISODE_DATA_ERR } from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';

// @Utils
import { mapEpisodes } from 'utils/feedUtils';
import { localFetch } from 'utils/fetchUtils';

export const getEpisodes = (podcastId: string) => (dispatch: Dispatch): Promise<Action> => {
  return localFetch('/resources/episodes.json')
    .then(data => {
      const episodesData = mapEpisodes(podcastId, data);
      return dispatch({
        type: EPISPDES_SET_EPISODE_DATA,
        payload: { episodesData }
      });
    })
    .catch(error => {
      return dispatch({
        type: EPISPDES_SET_EPISODE_DATA_ERR,
        payload: { error }
      });
    });
};
