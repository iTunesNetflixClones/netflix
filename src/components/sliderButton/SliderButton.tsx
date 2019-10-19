// @Vendors
import React from 'react';

// @Constants
import { SLIDER_BUTTON_TYPES } from '../../constants/enums';

// @Styles
import styles from './SliderButton.module.scss';

// @PropTypes
interface PropTypes {
  isHidden?: boolean;
  isUnmounted?: boolean;
  onClick: (isBackDirection: boolean) => void;
  type: SLIDER_BUTTON_TYPES;
}

const SliderButton: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { isHidden, isUnmounted, onClick, type } = props;

  const isBackDirection = type === SLIDER_BUTTON_TYPES.back;
  const iconClass: string = isBackDirection? 'fa fa-chevron-left' : 'fa fa-chevron-right';
  let buttonClass = `${styles.sliderButtonArea} ${isBackDirection ? styles.sliderButtonArea__left : styles.sliderButtonArea__right}`;
  buttonClass = `${buttonClass} ${isHidden ? styles.sliderButtonArea__hidden : ''}`;
  buttonClass = `${buttonClass} ${isUnmounted ? styles.sliderButtonArea__unmounted : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick.bind(null, isBackDirection)}>
      <i className={iconClass}/>
    </button>
  );
};

SliderButton.defaultProps = {
  isHidden: false,
  isUnmounted: false
};

export default SliderButton;