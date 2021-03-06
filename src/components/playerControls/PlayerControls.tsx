// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { BUTTON_MODIFIERS, BUTTON_SIZES, PLAYER_CONTROLS, SPACING, PLAYER_CONTROLS_SIZES } from 'constants/enums';

// @Components
import CircularButton from 'components/button/CircularButton';
import Tag from 'components/tag/Tag';

// @Utils
import { getParentalAgeText } from 'utils/miscHelper';

// Styles
import styles from './PlayerControls.module.scss';

// @PropTypes
interface PropTypes {
  controlsSet?: Array<PLAYER_CONTROLS>;
  explicit?: boolean;
  muted: boolean;
  onPressLike?: () => any;
  onPressMyList?: () => any;
  onPressUnlike?: () => any;
  onRestartPlayer: () => any;
  onToggleMuted: () => any;
  playing: boolean;
  size: PLAYER_CONTROLS_SIZES;
  thumbsDownActive?: boolean;
  thumbsUpActive?: boolean;
}

const getToggleMutedButton = (isMuted: boolean): string => isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up';

const PlayerControls: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    controlsSet,
    explicit,
    muted,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    onRestartPlayer,
    onToggleMuted,
    playing,
    size,
    thumbsDownActive,
    thumbsUpActive
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

  const checkControlRender = (
    controlType: PLAYER_CONTROLS, renderControl: () => ReactElement
  ): ReactElement | undefined => {
    if(controlsSet && controlsSet.find(control => control === controlType) !== undefined) {
      return renderControl();
    }
  };

  const renderControlButton = (icon: string, onPress?: () => any, activeState: boolean = false): ReactElement => {
    const buttonModifiers = [BUTTON_MODIFIERS.withBorder];
    if(activeState) {
      buttonModifiers.push(BUTTON_MODIFIERS.gradientActive);
    }

    return (
      <CircularButton
        iconSource={icon}
        modifiers={buttonModifiers}
        size={getControlButtonsSize()}
        spacing={[SPACING.right, SPACING.bottom]}
        onPress={onPress}
      />
    );
  };

  const renderParentalTag = (): ReactElement => {
    const parentalText = getParentalAgeText(explicit);
    return (
      <Tag injectedTexts={[]} textKey={parentalText} />
    );
  };

  const buttonIcon = playing ? getToggleMutedButton(muted) : 'fa fa-redo-alt';
  const buttonCallback = playing ? onToggleMuted : onRestartPlayer;
  return (
    <div className={buildControlsModifiers()}>
      <div className={styles.controlColumn} >
        { checkControlRender(PLAYER_CONTROLS.volumeControl, renderControlButton.bind(null, buttonIcon, buttonCallback)) }
        { checkControlRender(PLAYER_CONTROLS.like, renderControlButton.bind(null, 'fa fa-thumbs-up', onPressLike, thumbsUpActive)) }
        { checkControlRender(PLAYER_CONTROLS.unlike, renderControlButton.bind(null, 'fa fa-thumbs-down', onPressUnlike, thumbsDownActive)) }
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
  explicit: false,
  onPressLike: (): any => {},
  onPressMyList: (): any => {},
  onPressUnlike: (): any => {}
};

export default PlayerControls;