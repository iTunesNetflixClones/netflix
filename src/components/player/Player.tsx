// @Vendors
import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { isMobile } from "react-device-detect";

// @Components
import PlayerControls from 'components/playerControls/PlayerControls';

// @Actions
import { requestPlayerControl } from 'actions/player.actions';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from 'constants/enums';
import { StoreState } from 'constants/stateTypes';

// @Style
import styles from './Player.module.scss';

// @PropTypes
interface OwnProps {
  controlsSet?: Array<PLAYER_CONTROLS>;
  explicit?: boolean;
  hoverPlayMode?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPressLike?: () => void;
  onPressMyList?: () => void;
  onPressUnlike?: () => void;
  playerId: string;
  posterSrc?: string;
  renderOverlay?: (playing: boolean) => void;
  size: PLAYER_CONTROLS_SIZES;
  src: string;
  thumbsDownActive?: boolean;
  thumbsUpActive?: boolean;
}

interface StateProps {
  currentPlayingId?: string;
  playingEnabled: boolean;
}

interface DispatchProps {
  requestPlayerControl: Function;
}

type PropTypes = OwnProps & StateProps & DispatchProps;

const Player: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const {
    controlsSet,
    currentPlayingId,
    explicit,
    hoverPlayMode,
    loop, onPressLike,
    onPressMyList,
    onPressUnlike,
    playingEnabled,
    playerId,
    posterSrc,
    renderOverlay,
    requestPlayerControl,
    size,
    src,
    thumbsDownActive,
    thumbsUpActive
  } = props;

  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hoverPlayOn, setHoverPlay] = useState(false);
  const player = useRef<ReactPlayer>(null);

  const hoverPlayBlocked = hoverPlayMode && !hoverPlayOn;

  const isPlaying: boolean = !hoverPlayBlocked && playingEnabled && playing && playerId === currentPlayingId;

  useEffect(() => {
    if(!hoverPlayMode) {
      requestPlayerControl(playerId);
    }
  }, [hoverPlayMode, playerId, requestPlayerControl]);

  const handlePauseVideo = (): void => {
    setPlaying(false);
  };

  const toggleMuted = (): void => setMuted(!muted);

  const stopPlaying = (): void => {
    setPlaying(false);
    if(player.current) {
      player.current.seekTo(0);
    }
  };

  const restartPlayer = (): void => {
    if (player.current) {
      requestPlayerControl(playerId);
      player.current.seekTo(0);
      setPlaying(true);
    }
  };

  const handleHoverPlay = (nextState: boolean): void => {
    if(nextState) {
      restartPlayer();
    }
    setHoverPlay(nextState);
  };

  const handleTogleHoverPlay = (nextState: boolean): void => {
    if(!isMobile && hoverPlayMode) {
      handleHoverPlay(nextState);
    }
  };

  const handleClick = (): void => {
    if(isMobile && hoverPlayMode) {
      handleHoverPlay(!hoverPlayOn);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleTogleHoverPlay.bind(null, true)}
      onMouseLeave={handleTogleHoverPlay.bind(null, false)}
      className={styles.wrapper}>
      <div
        className={styles.playerArea}>
        <ReactPlayer
          fileConfig={{ attributes: { poster: posterSrc } }}
          loop={loop}
          ref={player}
          height="100%"
          width="100%"
          controls={false}
          frameBorder="0"
          modestbranding={1}
          playsinline
          muted={muted}
          onPause={handlePauseVideo}
          onEnded={stopPlaying}
          playing={isPlaying}
          showinfo={0}
          volume={1}
          url={src}
        />
      </div>
      <div>
        {renderOverlay && renderOverlay(isPlaying)}
        <PlayerControls
          controlsSet={controlsSet || []}
          explicit={explicit}
          muted={muted}
          onPressLike={onPressLike}
          onPressMyList={onPressMyList}
          onPressUnlike={onPressUnlike}
          onRestartPlayer={restartPlayer}
          onToggleMuted={toggleMuted}
          playing={playing}
          size={size}
          thumbsDownActive={thumbsDownActive}
          thumbsUpActive={thumbsUpActive} />
      </div>
    </div>
  );
};

Player.defaultProps = {
  controlsSet: [],
  explicit: false,
  hoverPlayMode: false,
  loop: false,
  muted: true,
  onPressLike: (): void => {},
  onPressMyList: (): void => {},
  onPressUnlike: (): void => {},
  renderOverlay: (): void => {}
};

const mapStateToProps = (state: StoreState): StateProps => ({
  currentPlayingId: state.playerReducer.currentPlayingId,
  playingEnabled: state.playerReducer.playingEnabled
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({ requestPlayerControl }, dispatch)
);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Player);
