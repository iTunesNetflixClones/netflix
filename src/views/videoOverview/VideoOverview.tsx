// @Vendors
import React from 'react';

// @Components
import FeaturedVideoHeader from '../../components/featuredVideoHeader/FeaturedVideoHeader';
import VideoCard from '../../components/videoCard/VideoCard';

const VideoOverview = () => (
  <div>
    <FeaturedVideoHeader
      onPressPlay={(id: string) => {}}
      onPressList={(id: string) => {}}
      onPressMoreInfo={(id: string) => {}}
      videoData={{
        id: 'mock id',
        description:
          'The series is a satirical depiction of working-class life, epitomized by the Simpson family, which consists of Homer, Marge, Bart, Lisa, and Maggie. The show is set in the fictional town of Springfield and parodies American culture and society, television, and the human condition.',
        src: 'https://www.youtube.com/embed/xXEhIL4gj5o?autoplay=1'
      }}
    />
    <div style={{position: 'relative'}}>
    <VideoCard
      onExpand={() => null}
      onExpandedStateChanges={value => {}}
      onPressLike={() => null}
      onPressMyList={() => null}
      onPressUnlike={() => null}
      posterSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRIpRuD5lllcBiArrj1JpgCJDm0XQ7AwdUsMHH01Mdx4QzO5t"
      videoData={{
        coincidence: 60,
        duration: 7380000,
        parentalAge: 13,
        tags: ['Changos', 're changos', 'changazos'],
        title: 'Los Simpsons',
        src: "https://www.youtube.com/embed/xXEhIL4gj5o?autoplay=1"
      }} />
    </div>
  </div>
);

export default VideoOverview;
