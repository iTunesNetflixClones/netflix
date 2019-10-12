// @Vendors
import React from 'react';
import { Provider } from 'react-redux';

// @Store
import store from './reducers/index';

// @Routes
import Router from './components/router/Router';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;