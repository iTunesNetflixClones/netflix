// @Vendors
import React from "react";

// @Styles
import styles from "./AppPlaceholder.module.scss";

// @Assets
import logo from "../../assets/svg/logo.svg";

const AppPlaceholder = (): JSX.Element => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className={styles.appLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default AppPlaceholder;
