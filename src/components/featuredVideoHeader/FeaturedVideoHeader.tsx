// @Vendors
import React from 'react';

// @Styles
import styles from './FeaturedVideoHeader.module.scss';

// @Constants & enums
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

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

  const renderVideoOverlay = (playing: boolean) => (
    <FeaturedVideoInfoOverlay
      onPressPlay={onPressPlay}
      onPressList={onPressList}
      onPressMoreInfo={onPressMoreInfo}
      showDescription={!playing}
      videoDescription={videoData.description}
      videoId={videoData.id}
    />
  );

  return (
    <div className={styles.container}>
      <Player
        controlsSet={[PLAYER_CONTROLS.volumeControl, PLAYER_CONTROLS.parentalTag]}
        loop
        playing
        renderOverlay={renderVideoOverlay}
        size={PLAYER_CONTROLS_SIZES.regular}
        src={videoData.src}
      />
    </div>
  );
};

export default FeaturedVideoHeader;
