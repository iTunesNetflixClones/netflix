// @Vendors
import React, { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';
import Player from 'components/player/Player';
import VideoEpisodes from 'components/videoEpisodes/VideoEpisodes';
import VideoDetails from 'components/videoDetails/VideoDetails';

// @Constants
import { ICON_CLOSE } from 'constants/constants';
import { PodcastData } from 'constants/types';
import { PLAYER_CONTROLS, PLAYER_CONTROLS_SIZES } from 'constants/enums';

// @Styles
import styles from './VideoDataTabbedView.module.scss';

// @PropTypes
interface PropTypes {
  id: string;
  onPressLike: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  onClose: () => void;
  thumbsDownActive: boolean;
  thumbsUpActive: boolean;
  videoData: PodcastData;
}

const VideoDataTabbedView: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { id, onClose, onPressLike, onPressUnlike, thumbsDownActive, thumbsUpActive, videoData } = props;

  const [ tabIndex, setTabIndex ] = useState(0);

  const { title } = videoData;

  useEffect(() => {
    setTabIndex(0);
  }, [videoData]);

  const renderCloseButton = (): ReactElement => {
    return (
      <button
        className={styles.closeButton}
        onClick={onClose}>
        <i className={ICON_CLOSE} />
      </button>
    );
  };

  const renderTab = (textKey: string, index: number): ReactElement => {
    const isSelected: boolean = index === tabIndex;
    const tabIndicatorClassname = classNames({
      [styles.tabIndicator]: true,
      [styles.tabIndicator__selected]: isSelected
    });
    const tabTextClassName = classNames({
      [styles.tabText]: true,
      [styles.tabText__selected]: isSelected
    });

    return (
      <div className={styles.tabContainer}>
        <button
          onClick={setTabIndex.bind(null, index)}
          className={styles.tab}>
          <FormattedText
            className={tabTextClassName}
            textKey={textKey}/>
        </button>
        <div className={tabIndicatorClassname}/>
      </div>
    );
  };

  const renderTabs = (): ReactElement => {
    return (
      <div className={styles.bottomTabs}>
        { renderTab("videoTabbedDetails-generalDescription", 0)}
        { renderTab("videoTabbedDetails-episodes", 1) }
      </div>
    );
  };

  const renderContent = (): ReactElement | undefined => {
    if(tabIndex === 0) {
      return (
        <VideoDetails
          onPressLike={onPressLike}
          onPressUnlike={onPressUnlike}
          thumbsDownActive={thumbsDownActive}
          thumbsUpActive={thumbsUpActive}
          videoData={videoData}/>
      );
    }
    if(tabIndex === 1) {
      return (
        <VideoEpisodes
          podcastId={videoData.id}/>
      );
    }
  };

  const renderVideoOverlay = (): ReactElement => {
    return (
      <div className={styles.videoOverlay} />
    );
  };

  const renderHeader = (): ReactElement => {
    const headerClassName = classNames({
      [styles.titleContainer]: true,
      [styles.titleContainer__shrinked]: tabIndex !== 0
    });

    return (
      <div className={headerClassName}>
        <Label
          className={styles.titleText}
          text={title}
        />
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      { renderCloseButton() }
      { renderTabs() }
      { renderHeader() }
      { renderContent() }
      <div className={styles.playerContainer}>
        <Player
          controlsSet={[PLAYER_CONTROLS.volumeControl]}
          explicit={videoData.explicit}
          loop={false}
          playerId={`${id}`}
          renderOverlay={renderVideoOverlay}
          size={PLAYER_CONTROLS_SIZES.regular}
          src={videoData.src} />
      </div>
    </div>
  );
};

export default VideoDataTabbedView;