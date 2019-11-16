// @Vendors
import React from 'react';

// @Styles
import styles from './FeaturedVideoHeader.module.scss';

// @Constants & enums
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from 'constants/enums';
import { PodcastData } from 'constants/types';

// @components
import FeaturedVideoInfoOverlay from 'components/featuredVideoInfoArea/FeaturedVideoInfoOverlay';
import Player from 'components/player/Player';

// @PropTypes
interface PropTypes {
  onPressPlay: (videoId: string) => any;
  onPressMoreInfo: (videoId: string) => any;
  podcastData: PodcastData;
}

const FeaturedVideoHeader: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressMoreInfo, onPressPlay, podcastData } = props;

  const { description, id, title } = podcastData;

  return (
    <div className={styles.mainContainer}>
      <FeaturedVideoInfoOverlay
        onPressPlay={onPressPlay}
        onPressMoreInfo={onPressMoreInfo}
        podcastDescription={description}
        podcastName={title}
        videoId={id}
      />
      <div className={styles.playerContainer}>
        <Player
          controlsSet={[PLAYER_CONTROLS.volumeControl]}
          playerId={`viewHeader-${id}`}
          size={PLAYER_CONTROLS_SIZES.regular}
          src={podcastData.src}
        />
      </div>
    </div>
  );
};

export default FeaturedVideoHeader;
