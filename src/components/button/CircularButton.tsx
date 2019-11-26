// @Vendors
import React from 'react';
import classNames from 'classnames';

// @Enums
import { BUTTON_MODIFIERS, BUTTON_SIZES, SPACING } from 'constants/enums';

// @Helpers
import { getButtonSizeStyle } from 'utils/layoutHelper';

// @Styles
import styles from './CircularButton.module.scss';

// @PropTypes
interface PropTypes {
  iconSource: string;
  modifiers?: Array<BUTTON_MODIFIERS>;
  onPress?: () => any;
  spacing?: Array<SPACING>;
  size?: BUTTON_SIZES;
}

const CircularButton: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { iconSource, modifiers, onPress, size, spacing } = props;
  const { baseButtonClass, baseButtonClassName } = getButtonSizeStyle(styles, size);

  const buildSpacing = (): string => {
    if(!spacing) {
      return '';
    }

    return classNames({
      [styles[`${baseButtonClassName}__topSeparated`]]: spacing.indexOf(SPACING.top) !== -1,
      [styles[`${baseButtonClassName}__rightSeparated`]]: spacing.indexOf(SPACING.right) !== -1,
      [styles[`${baseButtonClassName}__bottomSeparated`]]: spacing.indexOf(SPACING.bottom) !== -1,
      [styles[`${baseButtonClassName}__leftSeparated`]]: spacing.indexOf(SPACING.left) !== -1
    });
  };

  const buildModifiers = (): string => {
    if (!modifiers) {
      return '';
    }

    return classNames({
      [styles[`${baseButtonClassName}__border`]]: modifiers.indexOf(BUTTON_MODIFIERS.withBorder) !== -1,
      [styles[`${baseButtonClassName}__redContent`]]: modifiers.indexOf(BUTTON_MODIFIERS.redContent) !== -1,
      [styles[`${baseButtonClassName}__redBody`]]: modifiers.indexOf(BUTTON_MODIFIERS.redBody) !== -1,
      [styles[`${baseButtonClassName}__upperCase`]]: modifiers.indexOf(BUTTON_MODIFIERS.upperCase) !== -1,
      [styles[`${baseButtonClassName}__gradientActive`]]: modifiers.indexOf(BUTTON_MODIFIERS.gradientActive) !== -1
    });
  };

  const buildButtonClassName = (): string => `${baseButtonClass} ${buildSpacing()} ${buildModifiers()}`;

  return (
    <button
      className={buildButtonClassName()}
      onClick={onPress}
      type="button"
    >
      <i className={iconSource} />
    </button>
  );
};

CircularButton.defaultProps = {
  iconSource: undefined,
  modifiers: [],
  onPress: (): void => {},
  size: BUTTON_SIZES.regular,
  spacing:[]
};

export default CircularButton;
