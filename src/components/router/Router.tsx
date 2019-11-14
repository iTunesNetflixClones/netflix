// @Vendors
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// @Views
import VideoOverview from 'views/videoOverview/VideoOverview';

// @Components
import Topbar from 'components/topbar/Topbar';

// @Styles
import styles from './Router.module.scss';

const Routes: React.FunctionComponent<{}> = () => (
  <Router>
    <div className={styles.container}>
      <Topbar />
      <Route path="/" exact component={VideoOverview} />
    </div>
  </Router>
);

export default Routes;
