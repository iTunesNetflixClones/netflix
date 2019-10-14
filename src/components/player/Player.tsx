// @Vendors
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

// @Constants
import { BUTTON_MODIFIERS, PLAYER_SIZES, SPACING } from '../../constants/enums';

// @Components
import Button from '../button/Button';
import Tag from '../tag/Tag';

// @Style
import styles from './Player.module.scss';

type propTypes = {
  loop: boolean;
  muted: boolean;
  parentalAge: number;
  playing: boolean;
  renderOverlay: (playing: boolean, videoControls: any) => any;
  size: PLAYER_SIZES;
  src: string;
};

const getToggleMutedButton = (isMuted: boolean): string =>
  isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up';

const Player = (props: propTypes) => {
  const { parentalAge, renderOverlay, size, src } = props;
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const player = useRef<ReactPlayer>(null);

  const toggleMuted = () => setMuted(!muted);

  const togglePlaying = () => setPlaying(!playing);

  const restartPlayer = () => {
    if (player.current) {
      player.current.seekTo(0, 'seconds');
      setPlaying(true);
    }
  };

  const renderVideoControls = () => {
    const parentalText = parentalAge
      ? 'player-parentalAdvice'
      : 'player-parentalAll';
    const buttonIcon = playing ? getToggleMutedButton(muted) : 'fa fa-redo-alt';
    const buttonCallback = playing ? toggleMuted : restartPlayer;
    return (
      <div className={styles.controls}>
        <Button
          iconSource={buttonIcon}
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
          spacing={SPACING.right}
          onPress={buttonCallback}
          textKey=""
        />
        <Tag injectedTexts={[parentalAge]} textKey={parentalText} />
      </div>
    );
  };

  return (
    <div className={styles.wrapper__large}>
      <ReactPlayer
        ref={player}
        height="100%"
        width="100%"
        controls={false}
        frameBorder="0"
        modestbranding={1}
        muted={muted}
        onEnded={togglePlaying}
        playing={playing}
        showinfo={0}
        volume={1}
        url={src}
      />
      <div className={styles.overlay}>
        {renderOverlay && renderOverlay(playing, renderVideoControls())}
      </div>
    </div>
  );
};

Player.defaultProps = {
  loop: false,
  muted: true,
  parentalAge: 0,
  playing: false,
  renderOverlay: null,
  size: PLAYER_SIZES.sm
};

export default Player;
