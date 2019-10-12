// @Vendors
import React from 'react';

// @Styles
import styles from './FeaturedVideoHeader.module.scss';

// @Constants & enums
import { PLAYER_SIZES, SPACING } from '../../constants/enums';

// @components
import FeaturedVideoInfoOverlay from '../featuredVideoInfoArea/FeaturedVideoInfoOverlay';
import Player from '../player/Player';

type propTypes = {
  onPressPlay: (videoId: string) => any;
  onPressList: (videoId: string) => any;
  onPressMoreInfo: (videoId: string) => any;
  videoData: {
    id: string;
    description: string;
    src: string;
  };
};

const FeaturedVideoHeader = (props: propTypes) => {
  const { onPressList, onPressMoreInfo, onPressPlay, videoData } = props;

  const renderVideoOverlay = (playing: boolean, videoControls: any) => (
    <FeaturedVideoInfoOverlay
      onPressPlay={onPressPlay}
      onPressList={onPressList}
      onPressMoreInfo={onPressMoreInfo}
      showDescription={!playing}
      videoControls={videoControls}
      videoDescription={videoData.description}
      videoId={videoData.id}
    />
  );

  return (
    <div className={styles.container}>
      <Player
        loop
        playing
        renderOverlay={renderVideoOverlay}
        size={PLAYER_SIZES.lg}
        src={videoData.src}
      />
    </div>
  );
};

export default FeaturedVideoHeader;
