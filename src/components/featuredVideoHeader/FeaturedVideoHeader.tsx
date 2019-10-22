// @Vendors
import React, { ReactElement } from 'react';

// @Styles
import styles from './FeaturedVideoHeader.module.scss';

// @Constants & enums
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';
import { VideoData } from '../../constants/types';

// @components
import FeaturedVideoInfoOverlay from '../featuredVideoInfoArea/FeaturedVideoInfoOverlay';
import Player from '../player/Player';

// @PropTypes
interface PropTypes {
  onPressPlay: (videoId: string) => any;
  onPressList: (videoId: string) => any;
  onPressMoreInfo: (videoId: string) => any;
  videoData: VideoData;
}

const FeaturedVideoHeader: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressList, onPressMoreInfo, onPressPlay, videoData } = props;

  const { description, id } = videoData;

  const renderVideoOverlay = (playing: boolean): ReactElement => (
    <FeaturedVideoInfoOverlay
      onPressPlay={onPressPlay}
      onPressList={onPressList}
      onPressMoreInfo={onPressMoreInfo}
      showDescription={!playing}
      videoDescription={description}
      videoId={id}
    />
  );

  return (
    <div className={styles.container}>
      <Player
        controlsSet={[PLAYER_CONTROLS.volumeControl, PLAYER_CONTROLS.parentalTag]}
        loop
        playerId={`viewHeader-${id}`}
        renderOverlay={renderVideoOverlay}
        size={PLAYER_CONTROLS_SIZES.regular}
        src={videoData.src}
      />
    </div>
  );
};

export default FeaturedVideoHeader;
