// @Vendors
import React from 'react';

// @Styles
import styles from './FooterButton.module.scss';

// @PropTypes
interface PropTypes {
  onPress: () => any;
}

const FooterButton: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
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
};

export default FooterButton;