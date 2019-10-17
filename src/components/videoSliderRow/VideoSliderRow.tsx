// @Vendors
import React, { ReactElement, RefObject, useRef, useState } from 'react';
import get from 'lodash/get';

// @Styles
import styles from './VideoSliderRow.module.scss';

// @Constants
import { PositionCheck, VideoData } from '../../constants/types';

// @Helpers
import { checkVideoCardPosition } from '../../utils/layoutHelper';

// @Components
import VideoCard from '../videoCard/VideoCard';

// @PropTypes
interface PropTypes {
  onPlayVideo: (videoId: string) => any;
  onPressLike: (videoId: string) => any;
  onPressMyList: (videoId: string) => any;
  onPressUnlike: (videoId: string) => any;
  videosList: Array<VideoData>;
}


const VideoSliderRow: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPlayVideo, onPressLike, onPressMyList, onPressUnlike, videosList } = props;

  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ expandedIndex, setExpandedIndex ] = useState(-1);
  const [ scrollContentWidth, setScrollContentWidth ] = useState(0);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

  const isLastIndex = (index: number): boolean => {
    const screenWidth: number = window.innerWidth;
    return ((index + 1) * screenWidth) > scrollContentWidth;
  };

  const handleExpandVideo = (): void => {};

  const handleLoad = (): void => {
    const totalWidth: number = get(sliderScrollRef, 'current.scrollWidth', 0);
    setScrollContentWidth(totalWidth);
  };

  const handleExpandedStateChange = (videoIndex: number, expandedState: boolean): void => {
    const nextExpandedIndex: number = expandedState ? videoIndex : -1;
    setExpandedIndex(nextExpandedIndex);
  };

  const handleScroll = (isBack: boolean): void => {
    const nextIndex: number = currentIndex + (isBack ? -1 : 1);
    setCurrentIndex(nextIndex);
  };

  const getTranslationStyle = (): string => {
    const offset: number = currentIndex * 94.4  ;
    return `translateX(-${offset}vw)`;
  };

  const renderVideoCards = (): Array<ReactElement> => (
    videosList.map((video, indexInRow) => {
      const className: string = `${styles.sliderCard} ${indexInRow === expandedIndex ? styles.sliderCard__expanded : ''}`; // eslint-disable-line
      return (
        <div
          key={video.id}
          className={className}>
          <VideoCard
            index={indexInRow}
            onExpand={handleExpandVideo}
            onExpandedStateChanges={handleExpandedStateChange}
            onPlay={onPlayVideo}
            onPressLike={onPressLike}
            onPressMyList={onPressMyList}
            onPressUnlike={onPressUnlike}
            videoData={video}/>
        </div>
      );
    })
  );

  const renderScrollButton = (backOrientation: boolean): ReactElement | null => {
    const iconClass: string = backOrientation ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    const buttonClass = `${styles.scrollButtonArea} ${backOrientation ? styles.scrollButtonArea__left : styles.scrollButtonArea__right}`;
    if((backOrientation && currentIndex === 0) || (!backOrientation && isLastIndex(currentIndex))) {
      return null;
    }
    return (
      <button
        className={buttonClass}
        onClick={handleScroll.bind(null, backOrientation)}>
        <i className={iconClass}/>
      </button>
    );
  };

  const currentScreenWidth: number = window.innerWidth;
  const positionCheck: PositionCheck = checkVideoCardPosition(expandedIndex, currentScreenWidth);
  const firstInPageClass: string = positionCheck.isFirstInPage ? styles.sliderRow__expandedFirst : ''; // eslint-disable-line
  const lastInPageClass: string = positionCheck.isLastInPage ? styles.sliderRow__expandedLast : ''; // eslint-disable-line
  const className: string = `${styles.sliderRow} ${firstInPageClass || lastInPageClass}`;

  return (
    <div className={styles.sliderFrame}>
      { renderScrollButton(true) }
      <div
        onLoad={handleLoad}
        ref={sliderScrollRef}
        style={{ transform: getTranslationStyle() }}
        className={className}>
        { renderVideoCards() }
      </div>
      { renderScrollButton(false) }
    </div>
  );
};

export default VideoSliderRow;