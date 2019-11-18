// @Vendors
import React, { ReactElement } from 'react';
import classNames from 'classnames';

// @Styles
import styles from './HeadlinerButton.module.scss';

// @Constants
import { HL_BUTTON_CONTAINER_MODIFIERS, HL_BUTTON_MODIFIERS } from 'constants/enums';

// @Utils
import { formatText } from 'utils/i18n';

// @PropTypes
interface PropTypes {
  iconSource?: string;
  disabled?: boolean;
  containerModifiers?: Array<HL_BUTTON_CONTAINER_MODIFIERS>;
  modifiers?: Array<HL_BUTTON_MODIFIERS>;
  onClick: () => void;
  text?: string;
  textKey?: string;
}

const HeadlinerButton: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const { containerModifiers, disabled, iconSource, modifiers, onClick, text, textKey } = props;

  const buttonText = textKey ? formatText(textKey) : (text || '');

  const buildButtonClassName = (): string => {
    if(!modifiers) {
      return styles.container;
    }

    return classNames({
      [styles.container]: true,
      [styles.container__disabled]: disabled,
      [styles.container__gradientBG]: modifiers.indexOf(HL_BUTTON_MODIFIERS.GRADIENT_BG) !== -1,
      [styles.container__smallFont]: modifiers.indexOf(HL_BUTTON_MODIFIERS.SMALL_FONT) !== -1
    });
  };

  const buildContainerClassName = (): string => {
    if(!containerModifiers) {
      return styles.buttonAreaContainer;
    }

    return classNames({
      [styles.buttonAreaContainer]: true,
      [styles.buttonAreaContainer__extraSpacing]: containerModifiers.indexOf(HL_BUTTON_CONTAINER_MODIFIERS.EXTRA_SPACING) !== -1,
      [styles.buttonAreaContainer__inline]: containerModifiers.indexOf(HL_BUTTON_CONTAINER_MODIFIERS.INLINE) !== -1
    });
  };

  const renderIcon = (): ReactElement | null => {
    if(!iconSource) {
      return null;
    }

    return (
      <i className={iconSource} />
    );
  };

  return (
    <div className={buildContainerClassName()}>
      <button
        className={buildButtonClassName()}
        disabled={disabled}
        onClick={onClick}>
        { renderIcon() }
        { buttonText.toUpperCase() }
      </button>
    </div>
  );
};

HeadlinerButton.defaultProps = {
  iconSource: undefined,
  disabled: false,
  modifiers: [],
  text: ''
};

export default HeadlinerButton;