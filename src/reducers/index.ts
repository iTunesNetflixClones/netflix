// @Vendors
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @Reducers
import episodesReducer from './episodes.reducer';
import playerReducer from './player.reducer';
import podcastsReducer from './podscasts.reducer';
import slidersReducer from './sliders.reducer';

const rootReducer = combineReducers({
  episodesReducer,
  playerReducer,
  podcastsReducer,
  slidersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
