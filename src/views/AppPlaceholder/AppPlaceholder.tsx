// @Vendors
import React from 'react';

// @Styles
import styles from './AppPlaceholder.module.scss';

// @Components
import FormattedText from '../../components/formattedText/FormattedText';

// @Assets
import logo from '../../assets/svg/logo.svg';

const AppPlaceholder = () => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <p>
        <FormattedText textKey="test-edit" />
        <code> src/App.js </code>
        <FormattedText textKey="test-saveAndReload" />
      </p>
      <a
        className={styles.appLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedText textKey="test-learnReact" />
      </a>
    </header>
  </div>
);

export default AppPlaceholder;
