// @Vendors
import produce from 'immer';

// @Action types
import { EPISPDES_SET_EPISODE_DATA } from 'constants/actionTypes';

// @Constants
import { Action } from 'constants/types';
import { EpisodesState } from 'constants/stateTypes';

const initialState = (): EpisodesState => ({
  episodesData: []
});

const episodesReducer = produce((nextState: EpisodesState, action: Action): EpisodesState => {
  switch(action.type) {
    case EPISPDES_SET_EPISODE_DATA:
      nextState.episodesData = action.payload.episodesData;
      return nextState;
    default:
      return nextState;
  }
}, initialState());

export default episodesReducer;