// @Vendors
import React, { ReactElement, RefObject, useRef, useState, useEffect } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

// @Styles
import styles from './VideoSliderRow.module.scss';

// @Components
import FooterButton from 'components/footerButton/FooterButton';
import SliderButton from 'components/sliderButton/SliderButton';
import VideoCard from 'components/videoCard/VideoCard';
import VideoDataTabbedView from 'components/videoDataTabbedView/VideoDataTabbedView';

// @Constants
import { VIDEO_SLIDER_TRANSLATION_COEF, VIDEO_SLIDER_TRANSLATION_EXP, VIDEO_CARDS_AMOUNT } from 'constants/constants';
import { PositionCheck, PodcastData } from 'constants/types';
import { SLIDER_BUTTON_TYPES } from 'constants/enums';
import { StoreState } from 'constants/stateTypes';

// @Helpers
import { checkVideoCardPosition, getLastPageIndex, getTranslationStyle, isLastPage } from 'utils/layoutHelper';

// @Hooks
import useResizeDetector from 'hooks/resizeDetector';

// @Actions
import * as sliderActions from 'actions/slider.actions';

// @PropTypes
interface OwnProps {
  onPlayVideo: (videoId: string) => any;
  onPressLike: (videoId: string) => any;
  onPressUnlike: (videoId: string) => any;
  sliderId: string;
  videosList: Array<PodcastData>;
}
interface StateProps {
  currentSliderId?: string;
}
interface DispatchProps {
  openSlider: Function;
}
type PropTypes = OwnProps & StateProps & DispatchProps;

const VideoSliderRow: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    currentSliderId,
    onPlayVideo,
    onPressLike,
    onPressUnlike,
    openSlider,
    sliderId,
    videosList
  } = props;

  const [ slideButtonVisible, setSlideButtonVisible ] = useState(false);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ expandedIndex, setExpandedIndex ] = useState(-1);
  const [ scrollContentWidth, setScrollContentWidth ] = useState(0);
  const [ selectedIndex, setSelectedIndex ] = useState(-1);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

  const onChangeWindowDimensions = (): void => {
    if(isLastPage(currentIndex, scrollContentWidth, window.innerWidth)) {
      const lastPageIndex = getLastPageIndex(window.innerWidth, videosList.length, VIDEO_CARDS_AMOUNT);
      setCurrentIndex(lastPageIndex);
    }
  };

  useResizeDetector(onChangeWindowDimensions, [currentIndex, scrollContentWidth]);

  const handleExpandVideo = (index: number): void => {
    setSelectedIndex(index);
    openSlider(sliderId);
  };

  const handleShrinkVideo = (): void => {
    setSelectedIndex(-1);
    setExpandedIndex(-1);
    openSlider();
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

  useEffect(() => {
    if(currentSliderId !== undefined && currentSliderId !== sliderId) {
      handleShrinkVideo();
    }
  }, [currentSliderId]);

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
        id={`tabeedView-${sliderId}`}
        onClose={handleShrinkVideo}
        onPressPlay={onPlayVideo}
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

const mapStateToProps = (state: StoreState): StateProps => ({
  currentSliderId: state.slidersReducer.currentSliderId
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({ openSlider: sliderActions.openSlider }, dispatch)
);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoSliderRow);