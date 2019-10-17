// @Vendors
import React, { ReactElement, RefObject, useRef, useState } from 'react';
import get from 'lodash/get';

// @Styles
import styles from './VideoSliderRow.module.scss';

// @Constants
import {
  COMMON_WILDCARD,
  VIDEO_SLIDER_TRANSLATION_COEF,
  VIDEO_SLIDER_TRANSLATION_EXP
} from '../../constants/constants';
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
    const offset: number = currentIndex * VIDEO_SLIDER_TRANSLATION_COEF;
    return VIDEO_SLIDER_TRANSLATION_EXP.replace(COMMON_WILDCARD, offset.toString());
  };

  const renderVideoCards = (): Array<ReactElement> => (
    videosList.map((video, indexInRow) => {
      const isExpanded: boolean = indexInRow === expandedIndex;
      const className: string = `${styles.sliderCard} ${isExpanded ? styles.sliderCard__expanded : ''}`;
      return (
        <div
          key={video.id}
          className={className}>
          <VideoCard
            index={indexInRow}
            isExpanded={isExpanded}
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
  const mouseOverClass: string = expandedIndex !== -1 ? styles.sliderRow__hovered : '';
  const firstInPageClass: string = positionCheck.isFirstInPage ? styles.sliderRow__expandedFirst : '';
  const lastInPageClass: string = positionCheck.isLastInPage ? styles.sliderRow__expandedLast : '';
  const className: string = `${styles.sliderRow} ${mouseOverClass} ${firstInPageClass || lastInPageClass}`;

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