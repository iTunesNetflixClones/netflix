// @Vendors
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// @Reducers
import slidersReducer from './sliders.reducer';

const rootReducer = combineReducers({
  slidersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
