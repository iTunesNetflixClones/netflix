// @Vendors
import React from 'react';

// @Components
import FeaturedVideoHeader from '../../components/featuredVideoHeader/FeaturedVideoHeader';

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
  </div>
);

export default VideoOverview;
