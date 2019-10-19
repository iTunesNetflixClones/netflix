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
  cast: ['Homer Simpson', 'Marge Simpson', 'Bart Simpson'],
  id: '1',
  isNew: true,
  isSeries: true,
  coincidence: 60,
  description: 'The series is a satirical depiction of working-class life. The show is set in the fictional town of Springfield and parodies American culture and society, television, and the human condition.',
  duration: 7380000,
  genres: ['Animation', 'Comedy', 'Family'],
  parentalAge: 13,
  posterSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRIpRuD5lllcBiArrj1JpgCJDm0XQ7AwdUsMHH01Mdx4QzO5t",
  tags: ['Funny', 'Parody', 'American family'],
  title: 'The Simpsons',
  seasonsAmount: 2,
  src: "https://www.youtube.com/embed/xXEhIL4gj5o?autoplay=1",
  year: 2016
};

const videosList: Array<VideoData> = [];
for(let i = 0; i < 20; i++) {
  videosList.push({ ...videoSample, id: `${i}`, isNew: (i % 2 === 0), isSeries: (i % 3 === 0) });
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
