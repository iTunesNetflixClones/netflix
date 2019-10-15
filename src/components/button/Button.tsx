// @Vendors
import React from 'react';

// @Enums
import { BUTTON_MODIFIERS, BUTTON_SIZES, SPACING } from '../../constants/enums';

// @Styles
import styles from './Button.module.scss';

// @Helpers
import { formatText } from '../../utils/i18n';

type propTypes = {
  iconSource: string,
  modifiers: Array<BUTTON_MODIFIERS>,
  onPress: () => void,
  spacing: Array<SPACING>,
  size: BUTTON_SIZES,
  textKey: string;
};

const Button = (props: propTypes) => {
  const { iconSource, modifiers, onPress, size, spacing, textKey } = props;
  const baseButtonClassName = size ===  BUTTON_SIZES.regular ? 'buttonArea' : 'buttonAreaSmall';
  const baseButtonClass = size ===  BUTTON_SIZES.regular ? styles.buttonArea : styles.buttonAreaSmall;

  const buildIcon = () => {
    let icon;
    if (iconSource) {
      icon = <i className={iconSource} />;
    }
    return icon;
  };

  const buildText = (): string => {
    if (textKey) {
      return formatText(textKey);
    }
    return '';
  };

  const buildSpacing = (): string => {
    let modifiers = '';
    if(spacing.indexOf(SPACING.top) !== -1) {
      modifiers = `${modifiers} ${styles[`${baseButtonClassName}__topSeparated`]}`;
    }
    if(spacing.indexOf(SPACING.right) !== -1) {
      modifiers = `${modifiers} ${styles[`${baseButtonClassName}__rightSeparated`]}`;
    }
    if(spacing.indexOf(SPACING.bottom) !== -1) {
      modifiers = `${modifiers} ${styles[`${baseButtonClassName}__bottomSeparated`]}`;
    }
    if(spacing.indexOf(SPACING.left) !== -1) {
      modifiers = `${modifiers} ${styles[`${baseButtonClassName}__leftSeparated`]}`;
    }
    return modifiers;
  };

  const checkStyleModifier = (
    modifiers: Array<BUTTON_MODIFIERS>,
    modifierType: BUTTON_MODIFIERS,
    currentStyles: string,
    modifierStyletyle: string
  ): string => {
    if (modifiers.find(modifier => modifier === modifierType) !== undefined) {
      return `${currentStyles} ${modifierStyletyle}`;
    }
    return currentStyles;
  };

  const buildModifiers = (): string => {
    if (!modifiers) {
      return '';
    }
    let buttonModifiers = '';
    buttonModifiers = checkStyleModifier(
      modifiers,
      BUTTON_MODIFIERS.circle,
      buttonModifiers,
      styles[`${baseButtonClassName}__circle`]
    );
    buttonModifiers = checkStyleModifier(
      modifiers,
      BUTTON_MODIFIERS.withBorder,
      buttonModifiers,
      styles[`${baseButtonClassName}__border`]
    );
    buttonModifiers = checkStyleModifier(
      modifiers,
      BUTTON_MODIFIERS.redContent,
      buttonModifiers,
      styles[`${baseButtonClassName}__redContent`]
    );
    return buttonModifiers;
  };

  const buildButtonClassName = () => `${baseButtonClass} ${buildSpacing()} ${buildModifiers()}`;

  return (
    <button
      className={buildButtonClassName()}
      onClick={onPress}
      type="button"
    >
      {buildIcon()}
      {buildText()}
    </button>
  );
};

Button.defaultProps = {
  iconSource: null,
  modifiers: null,
  size: BUTTON_SIZES.regular,
  spacing:[],
  textKey: null
};

export default Button;
