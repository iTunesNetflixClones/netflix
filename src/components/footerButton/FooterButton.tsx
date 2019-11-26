// @Vendors
import React from 'react';

// @Styles
import styles from './FooterButton.module.scss';

// @Helpers
import { propagationPreventer } from 'utils/miscHelper';

// @PropTypes
interface PropTypes {
  onPress: () => any;
}

const FooterButton: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPress } = props;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    propagationPreventer(event, onPress);
  };

  const iconClass = `fa fa-chevron-down ${styles.iconScaled}`;
  return (
    <button
      className={styles.buttonArea}
      onClick={handleClick}
      type="button"
    >
      <i className={iconClass}/>
    </button>
  );
};

export default FooterButton;