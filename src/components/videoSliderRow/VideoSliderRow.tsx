// @Vendors
import React, { ReactElement, RefObject, useRef, useState } from 'react';
import get from 'lodash/get';

// @Styles
import styles from './VideoSliderRow.module.scss';

// @Components
import FooterButton from '../footerButton/FooterButton';
import VideoDataTabbedView from '../videoDataTabbedView/VideoDataTabbedView';

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
  const [ selectedIndex, setSelectedIndex ] = useState(-1);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

  const isLastIndex = (index: number): boolean => {
    const screenWidth: number = window.innerWidth;
    return ((index + 1) * screenWidth) > scrollContentWidth;
  };

  const handleExpandVideo = (index: number): void => {
    setSelectedIndex(index);
  };

  const handleShrinkVideo = (): void => {
    setSelectedIndex(-1);
    setExpandedIndex(-1);
  };

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

  const renderExpandButton = (index: number, isSelected: boolean): ReactElement | null => {
    const shouldShowFooter = index === expandedIndex && !isSelected && selectedIndex !== -1;
    if(!shouldShowFooter) {
      return null;
    }
    return (
      <FooterButton
        onPress={handleExpandVideo.bind(null, index)}/>
    );
  };

  const renderVideoCards = (): Array<ReactElement> => (
    videosList.map((video, indexInRow) => {
      const isSelected: boolean = selectedIndex === indexInRow;
      const isExpanded: boolean = selectedIndex === -1 && indexInRow === expandedIndex;
      const className: string = `${styles.sliderCard} ${isExpanded ? styles.sliderCard__expanded : ''}`;
      return (
        <div
          key={video.id}
          className={className}>
          <VideoCard
            index={indexInRow}
            isExpanded={isExpanded}
            isSelected={isSelected}
            onExpand={handleExpandVideo}
            onExpandedStateChanges={handleExpandedStateChange}
            onPlay={onPlayVideo}
            onPressLike={onPressLike}
            onPressMyList={onPressMyList}
            onPressUnlike={onPressUnlike}
            renderExpandButton={renderExpandButton.bind(null, indexInRow, isSelected)}
            videoData={video}/>
        </div>
      );
    })
  );

  const renderScrollButton = (backOrientation: boolean): ReactElement | null => {
    const iconClass: string = backOrientation ? 'fa fa-chevron-left' : 'fa fa-chevron-right';
    const buttonClass = `${styles.scrollButtonArea} ${backOrientation ? styles.scrollButtonArea__left : styles.scrollButtonArea__right}`;
    if((selectedIndex !== -1) || (backOrientation && currentIndex === 0) || (!backOrientation && isLastIndex(currentIndex))) {
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

  const renderDetailsTab = (): ReactElement | null => {
    if(selectedIndex === -1) {
      return null;
    }
    return (
      <VideoDataTabbedView
        onClose={handleShrinkVideo}
        onPressPlay={onPlayVideo}
        onPressMyList={onPressMyList}
        onPressLike={onPressLike}
        onPressUnlike={onPressUnlike}
        videoData={videosList[selectedIndex]}/>
    );
  };

  const currentScreenWidth: number = window.innerWidth;
  const positionCheck: PositionCheck = checkVideoCardPosition(expandedIndex, currentScreenWidth);
  const mouseOverClass: string = (expandedIndex !== -1 && selectedIndex === -1) ? styles.sliderRow__hovered : '';
  const firstInPageClass: string = (mouseOverClass && positionCheck.isFirstInPage) ? styles.sliderRow__expandedFirst : '';
  const lastInPageClass: string = (mouseOverClass && positionCheck.isLastInPage) ? styles.sliderRow__expandedLast : '';
  const className: string = `${styles.sliderRow} ${mouseOverClass} ${firstInPageClass || lastInPageClass}`;

  return (
    <React.Fragment>
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
      { renderDetailsTab() }
    </React.Fragment>
  );
};

export default VideoSliderRow;