// @Vendors
import React, { ReactElement } from 'react';

// @Enums
import { BUTTON_MODIFIERS, BUTTON_SIZES, SPACING } from '../../constants/enums';

// @Styles
import styles from './Button.module.scss';

// @Helpers
import { formatText } from '../../utils/i18n';

// @PropTypes
interface PropTypes {
  iconSource?: string;
  modifiers?: Array<BUTTON_MODIFIERS>;
  onPress?: () => any;
  spacing?: Array<SPACING>;
  size?: BUTTON_SIZES;
  textKey?: string;
}

const Button: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { iconSource, modifiers, onPress, size, spacing, textKey } = props;
  const baseButtonClassName = size ===  BUTTON_SIZES.regular ? 'buttonArea' : 'buttonAreaSmall';
  const baseButtonClass = size ===  BUTTON_SIZES.regular ? styles.buttonArea : styles.buttonAreaSmall;

  const buildIcon = (): ReactElement | undefined => {
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
    if(!spacing) {
      return modifiers;
    }
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
    buttonModifiers = checkStyleModifier(
      modifiers,
      BUTTON_MODIFIERS.redBody,
      buttonModifiers,
      styles[`${baseButtonClassName}__redBody`]
    );
    buttonModifiers = checkStyleModifier(
      modifiers,
      BUTTON_MODIFIERS.upperCase,
      buttonModifiers,
      styles[`${baseButtonClassName}__upperCase`]
    );
    return buttonModifiers;
  };

  const buildButtonClassName = (): string => `${baseButtonClass} ${buildSpacing()} ${buildModifiers()}`;

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
  iconSource: undefined,
  modifiers: [],
  onPress: (): void => {},
  size: BUTTON_SIZES.regular,
  spacing:[],
  textKey: undefined
};

export default Button;
