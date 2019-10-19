// @Vendors
import React, { ReactElement, useState } from 'react';

// @Components
import FormmatedText from '../formattedText/FormattedText';
import VideoEpisodes from '../videoEpisodes/VideoEpisodes';
import VideoDetails from '../videoDetails/VideoDetails';

// @Constants
import { VideoData } from '../../constants/types';

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
        <FormmatedText
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

  return (
    <div className={styles.mainContainer}>
      { renderCloseButton() }
      { renderTabs() }
      { renderContent() }
    </div>
  );
};

export default VideoDataTabbedView;