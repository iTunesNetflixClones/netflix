// @Vendors
import React from 'react';

// @Enums
import { BUTTON_MODIFIERS, SPACING } from '../../constants/enums';

// @Styles
import styles from './Button.module.scss';

// @Helpers
import { formatText } from '../../utils/i18n';

type propTypes = {
  iconSource: string;
  modifiers: Array<BUTTON_MODIFIERS>;
  onPress: () => void;
  spacing: SPACING;
  textKey: string;
};

const buildIcon = (iconSource: string) => {
  let icon;
  if (iconSource) {
    icon = <i className={iconSource} />;
  }
  return icon;
};

const buildText = (textKey: string): string => {
  if (textKey) {
    return formatText(textKey);
  }
  return '';
};

const buildSpacing = (spacing: SPACING): string => {
  switch (spacing) {
    case SPACING.top:
      return styles.buttonArea__topSeparated;
    case SPACING.right:
      return styles.buttonArea__rightSeparated;
    case SPACING.bottom:
      return styles.buttonArea__bottomSeparated;
    case SPACING.left:
      return styles.buttonArea__leftSeparated;
    default:
      return '';
  }
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

const buildModifiers = (modifiers: Array<BUTTON_MODIFIERS>): string => {
  if (!modifiers) {
    return '';
  }
  let buttonModifiers = '';
  buttonModifiers = checkStyleModifier(
    modifiers,
    BUTTON_MODIFIERS.circle,
    buttonModifiers,
    styles.buttonArea__circle
  );
  buttonModifiers = checkStyleModifier(
    modifiers,
    BUTTON_MODIFIERS.withBorder,
    buttonModifiers,
    styles.buttonArea__border
  );
  return buttonModifiers;
};

const Button = (props: propTypes) => {
  const { iconSource, modifiers, onPress, spacing, textKey } = props;
  return (
    <button
      className={`${styles.buttonArea} ${buildSpacing(
        spacing
      )} ${buildModifiers(modifiers)}`}
      onClick={onPress}
      type="button"
    >
      {buildIcon(iconSource)}
      {buildText(textKey)}
    </button>
  );
};

Button.defaultProps = {
  iconSource: null,
  modifiers: null,
  spacing: null,
  textKey: null
};

export default Button;
