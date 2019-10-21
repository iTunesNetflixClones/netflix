// @Vendors
import React, { ReactElement, useState } from 'react';

// @Components
import FormattedText from '../formattedText/FormattedText';
import Player from '../player/Player';
import VideoEpisodes from '../videoEpisodes/VideoEpisodes';
import VideoDetails from '../videoDetails/VideoDetails';

// @Constants
import { VideoData } from '../../constants/types';
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from '../../constants/enums';

// @Styles
import styles from './VideoDataTabbedView.module.scss';

// @PropTypes
interface PropTypes {
  onPressPlay: (videoId: string) => void;
  onPressMyList: (videoId: string) => void;
  onPressLike: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  onClose: () => void;
  videoData: VideoData;
}

const VideoDataTabbedView: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onClose, onPressPlay, onPressMyList, onPressLike, onPressUnlike, videoData } = props;

  const [ tabIndex, setTabIndex ] = useState(0);

  const { isSeries } = videoData;

  const renderCloseButton = (): ReactElement => {
    return (
      <button
        className={styles.closeButton}
        onClick={onClose}>
        <i className="fa fa-times" />
      </button>
    );
  };

  const renderTab = (textKey: string, index: number): ReactElement => {
    const isSelected: boolean = index === tabIndex;
    const className: string = `${styles.tab} ${isSelected ? styles.tab__selected : ''}`;
    return (
      <button
        onClick={setTabIndex.bind(null, index)}
        className={className}>
        <FormattedText
          className={styles.tabText}
          textKey={textKey}/>
      </button>
    );
  };

  const renderTabs = (): ReactElement => {
    return (
      <div className={styles.bottomTabs}>
        { renderTab("videoTabbedDetails-generalDescription", 0)}
        { isSeries && renderTab("videoTabbedDetails-episodes", 1)}
      </div>
    );
  };

  const renderContent = (): ReactElement | undefined => {
    if(tabIndex === 0) {
      return (
        <VideoDetails
          onPressPlay={onPressPlay}
          onPressMyList={onPressMyList}
          onPressLike={onPressLike}
          onPressUnlike={onPressUnlike}
          videoData={videoData}/>
      );
    }
    if(tabIndex === 1) {
      return (
        <VideoEpisodes />
      );
    }
  };

  const renderVideoOverlay = (): ReactElement => {
    return (
      <div className={styles.videoOverlay} />
    );
  };

  const headerClassName = `${styles.logoContainer} ${tabIndex === 1 ? styles.logoContainer__shrinked : ''}`;

  return (
    <div className={styles.mainContainer}>
      { renderCloseButton() }
      { renderTabs() }
      <div className={styles.innerContainer}>
        <div className={styles.headerContainer}>
          <div className={headerClassName}>
            <FormattedText
              className={styles.logoText}
              textKey="placeholders-videoLogo"
            />
          </div>
        </div>
      { renderContent() }
      </div>
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

export default VideoDataTabbedView;