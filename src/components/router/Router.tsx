// @Vendors
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

// @Views
import AppPlaceholder from "../../views/AppPlaceholder/AppPlaceholder";

// @Components
import Topbar from "../topbar/Topbar";

// @Styles
import styles from "./Router.module.scss";

const Routes = (): JSX.Element => (
  <Router>
    <div className={styles.container}>
      <Topbar />
      <Route path="/" exact component={AppPlaceholder} />
    </div>
  </Router>
);

export default Routes;
