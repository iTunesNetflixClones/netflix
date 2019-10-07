// @Vendors
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// @Views
import AppPlaceholder from '../views/AppPlaceholder/AppPlaceholder';

const Routes = () => (
  <Router>
    <div>
      <Route path="/" exact component={AppPlaceholder} />
    </div>
  </Router>
);

export default Routes;