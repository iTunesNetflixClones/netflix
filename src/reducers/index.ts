// @Vendors
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @Reducers
// TODO: import reducers here

const rootReducer = combineReducers({
  // TODO: define reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;