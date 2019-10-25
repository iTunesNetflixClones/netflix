// @Vendors
import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

// @Components
import PlayerControls from '../playerControls/PlayerControls';

// @Actions
import { requestPlayerControl } from '../../actions/player.actions';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';
import { StoreState } from '../../constants/stateTypes';

// @Style
import styles from './Player.module.scss';

// @PropTypes
interface OwnProps {
  controlsSet?: Array<PLAYER_CONTROLS>;
  loop?: boolean;
  muted?: boolean;
  onPressLike?: () => void;
  onPressMyList?: () => void;
  onPressUnlike?: () => void;
  playerId: string;
  parentalAge?: number;
  renderOverlay?: (playing: boolean) => void;
  size: PLAYER_CONTROLS_SIZES;
  src: string;
}

interface StateProps {
  currentPlayingId?: string;
}

interface DispatchProps {
  requestPlayerControl: Function;
}

type PropTypes = OwnProps & StateProps & DispatchProps;

const Player: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const {
    controlsSet,
    currentPlayingId,
    loop, onPressLike,
    onPressMyList,
    onPressUnlike,
    playerId,
    parentalAge,
    renderOverlay,
    requestPlayerControl,
    size,
    src
  } = props;

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const player = useRef<ReactPlayer>(null);

  const isPlaying: boolean = playing && playerId === currentPlayingId;

  useEffect(() => {
    requestPlayerControl(playerId);
  }, [playerId, requestPlayerControl]);

  const handlePauseVideo = (): void => {
    setPlaying(false);
  };

  const toggleMuted = (): void => setMuted(!muted);

  const togglePlaying = (): void => setPlaying(!playing);

  const restartPlayer = (): void => {
    if (player.current) {
      requestPlayerControl(playerId);
      player.current.seekTo(0, 'seconds');
      setPlaying(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.playerArea}>
        <ReactPlayer
          loop={loop}
          ref={player}
          height="100%"
          width="100%"
          controls={false}
          frameBorder="0"
          modestbranding={1}
          muted={muted}
          onPause={handlePauseVideo}
          onEnded={togglePlaying}
          playing={isPlaying}
          showinfo={0}
          volume={1}
          url={src}
        />
      </div>
      <div>
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
  renderOverlay: (): void => {}
};

const mapStateToProps = (state: StoreState): StateProps => ({
  currentPlayingId: state.playerReducer.currentPlayingId
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({ requestPlayerControl }, dispatch)
);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Player);
