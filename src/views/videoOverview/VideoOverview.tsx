// @Vendors
import React from 'react';
import { InferProps } from 'prop-types';

// @Constants
import { VideoData } from '../../constants/types';

// @Components
import FeaturedVideoHeader from '../../components/featuredVideoHeader/FeaturedVideoHeader';
import VideoSlider from '../../components/videoSlider/VideoSlider';

// @PropTypes
const propTypes = {};
type Props = InferProps<typeof propTypes>;

const videoSample = {
  id: '1',
  isSeries: true,
  coincidence: 60,
  description: 'The series is a satirical depiction of working-class life, epitomized by the Simpson family, which consists of Homer, Marge, Bart, Lisa, and Maggie. The show is set in the fictional town of Springfield and parodies American culture and society, television, and the human condition.',
  duration: 7380000,
  parentalAge: 13,
  posterSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRIpRuD5lllcBiArrj1JpgCJDm0XQ7AwdUsMHH01Mdx4QzO5t",
  tags: ['Animation', 'Comedy', 'Family'],
  title: 'The Simpsons',
  src: "https://www.youtube.com/embed/xXEhIL4gj5o?autoplay=1"
};

const videosList: Array<VideoData> = [];
for(let i = 0; i < 20; i++) {
  videosList.push({ ...videoSample, id: `${i}`});
}

const VideoOverview: React.FunctionComponent<Props>  = () => (
  <div style={{ paddingBottom: 200 }}>
    <FeaturedVideoHeader
      onPressPlay={(): void => {}}
      onPressList={(): void => {}}
      onPressMoreInfo={(): void => {}}
      videoData={videoSample}
    />
    <div style={{position: 'relative', marginTop: -270, zIndex: 30 }}>
      <VideoSlider
        onPlayVideo={(): void => {}}
        onPressLike={(): void => {}}
        onPressMyList={(): void => {}}
        onPressUnlike={(): void => {}}
        titleText="Recommended"
        videosList={videosList} />
    </div>
    <div style={{position: 'relative', zIndex: 30 }}>
      <VideoSlider
        onPlayVideo={(): void => {}}
        onPressLike={(): void => {}}
        onPressMyList={(): void => {}}
        onPressUnlike={(): void => {}}
        titleText="Trends"
        videosList={videosList} />
    </div>
  </div>
);

export default VideoOverview;
