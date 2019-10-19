// @Vendors
import React, { ReactElement, RefObject, useRef, useState } from 'react';
import get from 'lodash/get';

// @Styles
import styles from './VideoSliderRow.module.scss';

// @Components
import FooterButton from '../footerButton/FooterButton';
import SliderButton from '../sliderButton/SliderButton';
import VideoDataTabbedView from '../videoDataTabbedView/VideoDataTabbedView';

// @Constants
import { VIDEO_SLIDER_TRANSLATION_COEF, VIDEO_SLIDER_TRANSLATION_EXP } from '../../constants/constants';
import { PositionCheck, VideoData } from '../../constants/types';
import { SLIDER_BUTTON_TYPES } from '../../constants/enums';

// @Helpers
import { checkVideoCardPosition, getTranslationStyle, isLastPage } from '../../utils/layoutHelper';

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

  const [ slideButtonVisible, setSlideButtonVisible ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ expandedIndex, setExpandedIndex ] = useState(-1);
  const [ scrollContentWidth, setScrollContentWidth ] = useState(0);
  const [ selectedIndex, setSelectedIndex ] = useState(-1);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

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

  const isHovered = (expandedIndex !== -1 && selectedIndex === -1);
  const currentScreenWidth: number = window.innerWidth;
  const positionCheck: PositionCheck = checkVideoCardPosition(expandedIndex, currentScreenWidth);
  const mouseOverClass: string = isHovered ? styles.sliderRow__hovered : '';
  const firstInPageClass: string = (isHovered && positionCheck.isFirstInPage) ? styles.sliderRow__expandedFirst : '';
  const lastInPageClass: string = (isHovered && positionCheck.isLastInPage) ? styles.sliderRow__expandedLast : '';
  const className: string = `${styles.sliderRow} ${mouseOverClass} ${firstInPageClass || lastInPageClass}`;

  return (
    <React.Fragment>
      <div
        onMouseEnter={setSlideButtonVisible.bind(null, true)}
        onMouseLeave={setSlideButtonVisible.bind(null, false)}
        className={styles.sliderFrame}>
        <SliderButton
          isHidden={!slideButtonVisible}
          isUnmounted={(selectedIndex !== -1) || currentIndex === 0}
          onClick={handleScroll}
          type={SLIDER_BUTTON_TYPES.back}/>
        <div
          onLoad={handleLoad}
          ref={sliderScrollRef}
          style={{ transform: getTranslationStyle({
            pageIndex: currentIndex,
            translationCoef: VIDEO_SLIDER_TRANSLATION_COEF,
            translationExp: VIDEO_SLIDER_TRANSLATION_EXP
          })}}
          className={className}>
          { renderVideoCards() }
        </div>
        <SliderButton
          isHidden={!slideButtonVisible}
          isUnmounted={(selectedIndex !== -1) || isLastPage(currentIndex, scrollContentWidth, window.innerWidth)}
          onClick={handleScroll}
          type={SLIDER_BUTTON_TYPES.next}/>
      </div>
      { renderDetailsTab() }
    </React.Fragment>
  );
};

export default VideoSliderRow;