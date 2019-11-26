// @Vendors
import React, { ReactElement } from 'react';
import classNames from 'classnames';

// @Constants
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from 'constants/enums';
import { PodcastData } from 'constants/types';

// @Components
import Player from  'components/player/Player';
import VideoCardOverlay from 'components/videoCardOverlay/VideoCardOverlay';

// @Styles
import styles from './VideoCard.module.scss';

// @PropTypes
interface PropTypes {
  index: number;
  isExpanded: boolean;
  isSelected: boolean;
  onExpand: (index: number) => void;
  onExpandedStateChanges: (index: number, expandedState: boolean) => void;
  onPressLike: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  renderExpandButton?: () => void;
  thumbsDownActive: boolean;
  thumbsUpActive: boolean;
  videoData: PodcastData;
}

const VideoCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    index,
    isExpanded,
    isSelected,
    onExpand,
    onExpandedStateChanges,
    onPressLike,
    onPressUnlike,
    renderExpandButton,
    thumbsDownActive,
    thumbsUpActive,
    videoData
  } = props;
  const { id, explicit, posterSrc, src } = videoData;

  const handleSetExpanded = (expandedState: boolean): void => {
    onExpandedStateChanges(index, expandedState);
  };

  const handleExpand = (): void => { onExpand(index); };

  const handleLike = (): void => { onPressLike(id); };

  const handleUnlike = (): void => { onPressUnlike(id); };

  const renderVideoOverlay = (playing: boolean): ReactElement => {
    return (
      <VideoCardOverlay
        onPressExpand={handleExpand}
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
            PLAYER_CONTROLS.unlike
          ]}
          explicit={explicit}
          muted={false}
          onPressLike={handleLike}
          onPressUnlike={handleUnlike}
          playerId={`card-${id}`}
          renderOverlay={renderVideoOverlay}
          size={PLAYER_CONTROLS_SIZES.small}
          src={src}
          thumbsDownActive={thumbsDownActive}
          thumbsUpActive={thumbsUpActive} />
      </div>
    );
  };

  const renderIndicator = (): ReactElement | null => {
    if(!isSelected) {
      return null;
    }

    const indicatorClassName = classNames('fa fa-caret-down', styles.indicator);
    return (
      <div className={styles.indicatorContainer}>
        <i className={indicatorClassName}/>
      </div>
    );
  };

  const containerClassName = classNames({
    [styles.container]: true,
    [styles.container__expanded]: isExpanded
  });

  const wrapperClassName = classNames({
    [styles.cardWrapper]: true,
    [styles.cardWrapper__selected]: isSelected
  });

  return (
    <div
      className={wrapperClassName}
      onClick={onExpand.bind(null, index)}>
      <div
        onMouseEnter={(): void => handleSetExpanded(true)}
        onMouseLeave={(): void => handleSetExpanded(false)}
        className={containerClassName}>
        <img
          alt="featured video poster"
          className={styles.image}
          src={posterSrc} />
        { renderPlayer() }
        { renderExpandButton && renderExpandButton() }
      </div>
      { renderIndicator() }
    </div>
  );
};

VideoCard.defaultProps = {
  renderExpandButton: undefined
};

export default VideoCard;