// @Vendors
import React, { useState, ReactElement } from 'react';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';
import { VideoData } from '../../constants/types';

// @Components
import Player from  '../player/Player';
import VideoCardOverlay from '../videoCardOverlay/VideoCardOverlay';

// @Styles
import styles from './VideoCard.module.scss';

// @PropTypes
interface PropTypes {
  index: number;
  onExpand: (videoId: string) => void;
  onExpandedStateChanges: (index: number, expandedState: boolean) => void;
  onPlay: (videoId: string) => void;
  onPressLike: (videoId: string) => void;
  onPressMyList: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  videoData: VideoData;
}

const VideoCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    index,
    onExpand,
    onExpandedStateChanges,
    onPlay,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    videoData
  } = props;
  const { id, parentalAge, posterSrc, src } = videoData;

  const [ expanded, setExpanded ] = useState(false);

  const handleSetExpanded = (expandedState: boolean): void => {
    setExpanded(expandedState);
    onExpandedStateChanges(index, expandedState);
  };

  const handleExpand = (): void => { onExpand(id); };

  const handleLike = (): void => { onPressLike(id); };

  const handleMyList = (): void => { onPressMyList(id); };

  const handleUnlike = (): void => { onPressUnlike(id); };

  const handlePlay = (): void => { onPlay(id); };

  const renderVideoOverlay = (playing: boolean): ReactElement => {
    return (
      <VideoCardOverlay
        onPressExpand={handleExpand}
        onPressPlay={handlePlay}
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
          onPressLike={handleLike}
          onPressMyList={handleMyList}
          onPressUnlike={handleUnlike}
          parentalAge={parentalAge}
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