// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { VideoData } from '../../constants/types';
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Components
import Player from '../player/Player';

// @Styles
import styles from './VideoDetails.module.scss';

// @PropTypes
interface PropTypes {
  videoData: VideoData;
}

const VideoDetails: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData } = props;

  const renderVideoOverlay = (): ReactElement => {
    return (
      <div className={styles.videoOverlay} />
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.playerContainer}>
        <Player
          controlsSet={[PLAYER_CONTROLS.volumeControl]}
          loop={false}
          parentalAge={videoData.parentalAge}
          renderOverlay={renderVideoOverlay}
          size={PLAYER_CONTROLS_SIZES.regular}
          src={videoData.src} />
      </div>
    </div>
  );
};

export default VideoDetails;
