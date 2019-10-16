// @Vendors
import React, { useState, ReactElement } from 'react';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Components
import Player from  '../player/Player';
import VideoCardOverlay from '../videoCardOverlay/VideoCardOverlay';

// @Styles
import styles from './VideoCard.module.scss';

// @PropTypes
interface PropTypes {
  onExpand: () => void;
  onExpandedStateChanges: (expandedState: boolean) => void;
  onPlay: () => void;
  onPressLike: () => void;
  onPressMyList: () => void;
  onPressUnlike: () => void;
  posterSrc: string;
  videoData: {
    coincidence: number;
    duration: number;
    parentalAge: number;
    src: string;
    tags: Array<string>;
    title: string;
  };
}

const VideoCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    onExpand,
    onExpandedStateChanges,
    onPlay,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    posterSrc,
    videoData
  } = props;
  const { parentalAge, src } = videoData;

  const [ expanded, setExpanded ] = useState(false);

  const handleSetExpanded = (expandedState: boolean): void => {
    setExpanded(expandedState);
    onExpandedStateChanges(expandedState);
  };

  const renderVideoOverlay = (playing: boolean): ReactElement => {
    return (
      <VideoCardOverlay
        onPressExpand={onExpand}
        onPressPlay={onPlay}
        playing={playing}
        videoData={videoData} />
    );
  };

  const renderPlayer = (): ReactElement | null => {
    if(!expanded) {
      return null;
    }
    return (
      <div className={styles.playerContainer}>
        <Player
          controlsSet={[
            PLAYER_CONTROLS.volumeControl,
            PLAYER_CONTROLS.like,
            PLAYER_CONTROLS.unlike,
            PLAYER_CONTROLS.myList
          ]}
          loop
          muted={false}
          onPressLike={onPressLike}
          onPressMyList={onPressMyList}
          onPressUnlike={onPressUnlike}
          parentalAge={parentalAge}
          playing
          renderOverlay={renderVideoOverlay}
          size={PLAYER_CONTROLS_SIZES.small}
          src={src} />
      </div>
    );
  };

  return (
    <div
      onMouseEnter={(): void => handleSetExpanded(true)}
      onMouseLeave={(): void => handleSetExpanded(false)}
      className={styles.container}>
      <img
        className={styles.image}
        src={posterSrc}/>
      { renderPlayer() }
    </div>
  );
};

export default VideoCard;