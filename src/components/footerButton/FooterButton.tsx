// @Vendors
import React from 'react';

// @Styles
import styles from './FooterButton.module.scss';

type propTypes = {
  onPress: () => any
};

const FooterButton = (props: propTypes) => {
  const { onPress } = props;

  const iconClass = `fa fa-chevron-down ${styles.iconScaled}`;
  return (
    <button
      className={styles.buttonArea}
      onClick={onPress}
      type="button"
    >
      <i className={iconClass}/>
    </button>
  );
}

export default FooterButton;