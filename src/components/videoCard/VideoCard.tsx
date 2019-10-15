// @Vendors
import React, { useState } from 'react';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Components
import Player from  '../player/Player';
import VideoCardOverlay from '../videoCardOverlay/VideoCardOverlay';

// @Styles
import styles from './VideoCard.module.scss';

type propTypes = {
  onExpand: () => any,
  onExpandedStateChanges: (nextState: boolean) => void,
  onPressLike: () => any,
  onPressMyList: () => any,
  onPressUnlike: () => any,
  posterSrc: string,
  videoData: {
    coincidence: number,
    duration: number,
    parentalAge: number,
    src: string,
    tags: Array<string>,
    title: string
  }
};

const VideoCard = (props: propTypes) => {
  const {
    onExpand,
    onExpandedStateChanges,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    posterSrc,
    videoData
  } = props;
  const [ expanded, setExpanded ] = useState(false);

  const handleSetExpanded = (expandedState: boolean): void => {
    setExpanded(expandedState);
    onExpandedStateChanges(expandedState);
  }

  const renderVideoOverlay = (playing: boolean) => {
    return (
      <VideoCardOverlay
        onPressExpand={onExpand}
        playing={playing}
        videoData={videoData} />
    )
  }

  const renderPlayer = () => {
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
          parentalAge={videoData.parentalAge}
          playing
          renderOverlay={renderVideoOverlay}
          size={PLAYER_CONTROLS_SIZES.small}
          src={videoData.src} />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => handleSetExpanded(true)}
      onMouseLeave={() => handleSetExpanded(false)}
      className={styles.container}>
      <img
        className={styles.image}
        src={posterSrc}/>
      { renderPlayer() }
    </div>
  )
};

export default VideoCard;