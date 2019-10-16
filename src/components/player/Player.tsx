// @Vendors
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

// @Components
import PlayerControls from '../playerControls/PlayerControls';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Style
import styles from './Player.module.scss';

// @PropTypes
interface PropTypes {
  controlsSet?: Array<PLAYER_CONTROLS>;
  loop?: boolean;
  muted?: boolean;
  onPressLike?: () => void;
  onPressMyList?: () => void;
  onPressUnlike?: () => void;
  parentalAge?: number;
  playing?: boolean;
  renderOverlay?: (playing: boolean) => void;
  size: PLAYER_CONTROLS_SIZES;
  src: string;
}

const Player: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const {
    controlsSet,
    loop, onPressLike,
    onPressMyList,
    onPressUnlike,
    parentalAge,
    renderOverlay,
    size,
    src
  } = props;

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const player = useRef<ReactPlayer>(null);

  const toggleMuted = (): void => setMuted(!muted);

  const togglePlaying = (): void => setPlaying(!playing);

  const restartPlayer = (): void => {
    if (player.current) {
      player.current.seekTo(0, 'seconds');
      setPlaying(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        loop={loop}
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
        {renderOverlay && renderOverlay(playing)}
        <PlayerControls
          controlsSet={controlsSet || []}
          muted={muted}
          onPressLike={onPressLike}
          onPressMyList={onPressMyList}
          onPressUnlike={onPressUnlike}
          onRestartPlayer={restartPlayer}
          onToggleMuted={toggleMuted}
          parentalAge={parentalAge}
          playing={playing}
          size={size} />
      </div>
    </div>
  );
};

Player.defaultProps = {
  controlsSet: [],
  loop: false,
  muted: true,
  onPressLike: (): void => {},
  onPressMyList: (): void => {},
  onPressUnlike: (): void => {},
  parentalAge: 0,
  playing: false,
  renderOverlay: (): void => {}
};

export default Player;
