// @Vendors
import React, { RefObject, useRef, useState, ReactElement, useEffect } from 'react';
import get from 'lodash/get';
import { isMobile } from 'react-device-detect';

// @Constants
import { EpisodeData } from 'constants/types';
import { SLIDER_BUTTON_TYPES } from 'constants/enums';
import {
  EPISODE_CARDS_AMOUNT,
  EPISODE_SLIDER_TRANSLATION_COEF,
  EPISODE_SLIDER_TRANSLATION_COEF_RESP,
  EPISODE_SLIDER_TRANSLATION_EXP,
  SCREEN_TABLET_MIN_WIDTH
} from 'constants/constants';

// @Components
import EpisodeCard from 'components/episodeCard/EpisodeCard';
import SliderButton from 'components/sliderButton/SliderButton';

// @Helpers
import { getLastPageIndex, getTranslationStyle, isLastPage } from 'utils/layoutHelper';

// @Hooks
import useResizeDetector from 'hooks/resizeDetector';

// @Styles
import styles from './EpisodeSlider.module.scss';

// @PropTypes
interface PropTypes {
  episodesList: Array<EpisodeData>;
  onPressPlay: (episodeId: string) => void;
}

const EpisodeSlider: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodesList } = props;

  const [ sliderButtonVisible, setSliderButtonVisible ] = useState(false);
  const [ pageIndex, setPageIndex ] = useState(0);
  const [ scrollContentWidth, setScrollContentWidth ] = useState(0);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

  const onChangeWindowDimensions = (): void => {
    if(isLastPage(pageIndex, window.innerWidth, EPISODE_CARDS_AMOUNT, episodesList.length)) {
      const lastPageIndex = getLastPageIndex(window.innerWidth, episodesList.length, EPISODE_CARDS_AMOUNT);
      setPageIndex(lastPageIndex);
    }
  };

  const handleMouseOver = (nextOverState: boolean): void => {
    if(!isMobile) {
      setSliderButtonVisible(nextOverState);
    }
  };

  useResizeDetector(onChangeWindowDimensions, [pageIndex, scrollContentWidth]);

  const handleScroll = (isBack: boolean): void => {
    const nextIndex: number = pageIndex + (isBack ? -1 : 1);
    setPageIndex(nextIndex);
  };

  useEffect(() => {
    const totalWidth: number = get(sliderScrollRef, 'current.scrollWidth', 0);
    if(totalWidth !== scrollContentWidth) {
      setScrollContentWidth(totalWidth);
    }
  }, [sliderScrollRef, scrollContentWidth, setScrollContentWidth]);

  const renderEpisodeCards = (): Array<ReactElement> => {
    return episodesList.map(episode => {
      const composedId = `${episode.relatedPodcastId}${episode.title}`;
      return (
        <div
          key={composedId}
          className={styles.sliderCard}>
          <EpisodeCard
            episodeData={episode}/>
        </div>
      );
    });
  };

  return (
    <div
      onMouseEnter={handleMouseOver.bind(null, true) }
      onMouseLeave={handleMouseOver.bind(null, false)}
      className={styles.sliderFrame}>
      <SliderButton
        isHidden={!sliderButtonVisible && !isMobile}
        isUnmounted={pageIndex === 0}
        onClick={handleScroll}
        type={SLIDER_BUTTON_TYPES.back}/>
      <div
        ref={sliderScrollRef}
        style={{ transform: getTranslationStyle({
          pageIndex,
          translationCoef: window.innerWidth >= SCREEN_TABLET_MIN_WIDTH ? EPISODE_SLIDER_TRANSLATION_COEF: EPISODE_SLIDER_TRANSLATION_COEF_RESP,
          translationExp: EPISODE_SLIDER_TRANSLATION_EXP,
          cardsAmount: episodesList.length,
          cardsAmountPerPage: EPISODE_CARDS_AMOUNT,
          elementsAmount: episodesList.length,
          screenWidth: window.innerWidth,
          fitLastPage: true
        })}}
        className={styles.sliderRow}>
        { renderEpisodeCards() }
      </div>
      <SliderButton
        isHidden={!sliderButtonVisible && !isMobile}
        isUnmounted={isLastPage(pageIndex, window.innerWidth, EPISODE_CARDS_AMOUNT, episodesList.length)}
        onClick={handleScroll}
        type={SLIDER_BUTTON_TYPES.next}/>
    </div>
  );
};

export default EpisodeSlider;