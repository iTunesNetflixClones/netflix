// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { BUTTON_MODIFIERS, BUTTON_SIZES, PLAYER_CONTROLS, SPACING, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Components
import Button from '../button/Button';
import Tag from '../tag/Tag';

// @Utils
import { getParentalAgeText } from '../../utils/miscHelper';

// Styles
import styles from './PlayerControls.module.scss';

// @PropTypes
interface PropTypes {
  controlsSet?: Array<PLAYER_CONTROLS>;
  muted: boolean;
  onPressLike?: () => any;
  onPressMyList?: () => any;
  onPressUnlike?: () => any;
  onRestartPlayer: () => any;
  onToggleMuted: () => any;
  parentalAge?: number;
  playing: boolean;
  size: PLAYER_CONTROLS_SIZES;
}

const getToggleMutedButton = (isMuted: boolean): string => isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up';

const PlayerControls: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    controlsSet,
    muted,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    onRestartPlayer,
    onToggleMuted,
    parentalAge,
    playing,
    size
  } = props;

  const buildControlsModifiers = (): string => {
    let styleString = `${styles.controls}`;
    if(size === PLAYER_CONTROLS_SIZES.small) {
      styleString = `${styleString} ${styles.controls__small}`;
    }
    return styleString;
  };

  const getControlButtonsSize = (): BUTTON_SIZES => (
    size === PLAYER_CONTROLS_SIZES.small ? BUTTON_SIZES.small : BUTTON_SIZES.regular
  );

  const checkControlRender = (controlType: PLAYER_CONTROLS, renderControl: () => ReactElement): ReactElement | undefined => {
    if(controlsSet && controlsSet.find(control => control === controlType) !== undefined) {
      return renderControl();
    }
  };

  const renderControlButton = (icon: string, onPress?: () => any): ReactElement => (
    <Button
      iconSource={icon}
      modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
      size={getControlButtonsSize()}
      spacing={[SPACING.right, SPACING.bottom]}
      onPress={onPress}
      textKey=""
    />
  );

  const renderParentalTag = (): ReactElement => {
    const parentalText = getParentalAgeText(parentalAge);
    const injectedTexts = parentalAge ? [parentalAge] : [];
    return (
      <Tag injectedTexts={injectedTexts} textKey={parentalText} />
    );
  };

  const buttonIcon = playing ? getToggleMutedButton(muted) : 'fa fa-redo-alt';
  const buttonCallback = playing ? onToggleMuted : onRestartPlayer;
  return (
    <div className={buildControlsModifiers()}>
      <div className={styles.controlColumn} >
        { checkControlRender(PLAYER_CONTROLS.volumeControl, renderControlButton.bind(null, buttonIcon, buttonCallback)) }
        { checkControlRender(PLAYER_CONTROLS.like, renderControlButton.bind(null, 'fa fa-thumbs-up', onPressLike)) }
        { checkControlRender(PLAYER_CONTROLS.unlike, renderControlButton.bind(null, 'fa fa-thumbs-down', onPressUnlike)) }
        { checkControlRender(PLAYER_CONTROLS.myList, renderControlButton.bind(null, 'fa fa-plus', onPressMyList)) }
      </div>
      <div className={styles.tagContainer}>
        { checkControlRender(PLAYER_CONTROLS.parentalTag, renderParentalTag) }
      </div>
    </div>
  );
};

PlayerControls.defaultProps = {
  controlsSet: [],
  onPressLike: (): any => {},
  onPressMyList: (): any => {},
  onPressUnlike: (): any => {},
  parentalAge: 0 as number
};

export default PlayerControls;