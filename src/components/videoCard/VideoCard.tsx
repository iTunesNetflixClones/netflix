// @Vendors
import React, { ReactElement } from 'react';

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
  isExpanded: boolean;
  isSelected: boolean;
  onExpand: (index: number) => void;
  onExpandedStateChanges: (index: number, expandedState: boolean) => void;
  onPlay: (videoId: string) => void;
  onPressLike: (videoId: string) => void;
  onPressMyList: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  renderExpandButton?: () => void;
  videoData: VideoData;
}

const VideoCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    index,
    isExpanded,
    isSelected,
    onExpand,
    onExpandedStateChanges,
    onPlay,
    onPressLike,
    onPressMyList,
    onPressUnlike,
    renderExpandButton,
    videoData
  } = props;
  const { id, parentalAge, posterSrc, src } = videoData;

  const handleSetExpanded = (expandedState: boolean): void => {
    onExpandedStateChanges(index, expandedState);
  };

  const handleExpand = (): void => { onExpand(index); };

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
    if(!isExpanded) {
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

  const renderIndicator = (): ReactElement | null => {
    if(!isSelected) {
      return null;
    }
    return (
      <div className={styles.indicator}/>
    );
  };

  const className = `${styles.container} ${isExpanded ? styles.container__expanded : ''} ${isSelected ? styles.container__selected : ''}`;

  return (
    <div
      onMouseEnter={(): void => handleSetExpanded(true)}
      onMouseLeave={(): void => handleSetExpanded(false)}
      className={className}>
      <img
        className={styles.image}
        src={posterSrc}/>
      { renderPlayer() }
      { renderIndicator() }
      { renderExpandButton && renderExpandButton() }
    </div>
  );
};

VideoCard.defaultProps = {
  renderExpandButton: undefined
};

export default VideoCard;