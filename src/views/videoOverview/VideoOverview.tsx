// @Vendors
import React from 'react';
import { InferProps } from 'prop-types';

// @Components
import FeaturedVideoHeader from '../../components/featuredVideoHeader/FeaturedVideoHeader';
import VideoSlider from '../../components/videoSlider/VideoSlider';

// @Styles
import styles from './VideoOverview.module.scss';

// @Mock data
import videosList from '../../resources/videoData';

// @PropTypes
const propTypes = {};
type Props = InferProps<typeof propTypes>;

const VideoOverview: React.FunctionComponent<Props>  = () => (
  <div className={styles.mainContainer}>
    <FeaturedVideoHeader
      onPressPlay={(): void => {}}
      onPressList={(): void => {}}
      onPressMoreInfo={(): void => {}}
      videoData={videosList[1]}
    />
    <div className={styles.sliderContainer}>
      <VideoSlider
        onPlayVideo={(): void => {}}
        onPressLike={(): void => {}}
        onPressMyList={(): void => {}}
        onPressUnlike={(): void => {}}
        sliderId='1'
        titleText="Recommended"
        videosList={videosList} />
      <VideoSlider
        onPlayVideo={(): void => {}}
        onPressLike={(): void => {}}
        onPressMyList={(): void => {}}
        onPressUnlike={(): void => {}}
        sliderId='2'
        titleText="Trends"
        videosList={videosList} />
    </div>
  </div>
);

export default VideoOverview;
