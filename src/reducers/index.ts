// @Vendors
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @Reducers
import playerReducer from './player.reducer';
import slidersReducer from './sliders.reducer';

const rootReducer = combineReducers({
  playerReducer,
  slidersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
