// @Vendors
import React from 'react';
import { Provider } from 'react-redux';

// @Store
import store from './reducers/index';

// @Routes
import Routes from './config/Routes';

function App() {
  return (
    <Provider
      store={store}
    >
      <Routes />
    </Provider>
  );
}

export default App;
