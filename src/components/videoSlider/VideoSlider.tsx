// @Vendors
import React, { ReactElement } from 'react';

// @Styles
import styles from './VideoSlider.module.scss';

// @Constants
import { VideoData } from '../../constants/types';

// @Components
import FormattedText from '../formattedText/FormattedText';
import Label from '../label/Label';
import VideoSliderRow from '../videoSliderRow/VideoSliderRow';

// @PropTypes
interface PropTypes {
  onPlayVideo: (videoId: string) => any;
  onPressLike: (videoId: string) => any;
  onPressMyList: (videoId: string) => any;
  onPressUnlike: (videoId: string) => any;
  titleKey?: string;
  titleText?: string;
  videosList: Array<VideoData>;
}


const VideoSlider: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPlayVideo, onPressLike, onPressMyList, onPressUnlike, titleKey, titleText, videosList } = props;

  const renderTitle = (): ReactElement | null => {
    if(titleKey) {
      return (
        <FormattedText
          className={styles.titleText}
          textKey={titleKey}/>
      );
    }
    if(titleText) {
      return (
        <Label
          className={styles.titleText}
          text={titleText}/>
      );
    }
    return null;
  };

  return (
    <div className={styles.mainContainer}>
      { renderTitle() }
      <VideoSliderRow
        onPlayVideo={onPlayVideo}
        onPressLike={onPressLike}
        onPressMyList={onPressMyList}
        onPressUnlike={onPressUnlike}
        videosList={videosList} />
    </div>
  );
};

VideoSlider.defaultProps = {
  titleKey: '',
  titleText: ''
};

export default VideoSlider;