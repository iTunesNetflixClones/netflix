// @Vendors
import React, { RefObject, useRef, useState, ReactElement } from 'react';
import get from 'lodash/get';

// @Constants
import { EpisodeData } from '../../constants/types';
import { SLIDER_BUTTON_TYPES } from '../../constants/enums';
import { EPISODE_CARDS_AMOUNT, EPISODE_SLIDER_TRANSLATION_COEF, EPISODE_SLIDER_TRANSLATION_EXP } from '../../constants/constants';

// @Components
import EpisodeCard from '../episodeCard/EpisodeCard';
import SliderButton from '../sliderButton/SliderButton';

// @Helpers
import { getTranslationStyle, isLastPage } from '../../utils/layoutHelper';

// @Styles
import styles from './EpisodeSlider.module.scss';

// @PropTypes
interface PropTypes {
  episodesList: Array<EpisodeData>;
}

const EpisodeSlider: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodesList } = props;

  const [ slideButtonVisible, setSlideButtonVisible ] = useState(false);
  const [ pageIndex, setPageIndex ] = useState(0);
  const [ scrollContentWidth, setScrollContentWidth ] = useState(0);

  const sliderScrollRef: RefObject<HTMLDivElement> = useRef(null);

  const handleLoad = (): void => {
    const totalWidth: number = get(sliderScrollRef, 'current.scrollWidth', 0);
    setScrollContentWidth(totalWidth);
  };

  const handleScroll = (isBack: boolean): void => {
    const nextIndex: number = pageIndex + (isBack ? -1 : 1);
    setPageIndex(nextIndex);
  };

  const renderEpisodeCards = (): Array<ReactElement> => {
    return episodesList.map(episode => (
      <div
        key={episode.id}
        className={styles.sliderCard}>
        <EpisodeCard
          episodeData={episode}/>
      </div>
    ));
  };

  return (
    <div
      onMouseEnter={setSlideButtonVisible.bind(null, true)}
      onMouseLeave={setSlideButtonVisible.bind(null, false)}
      className={styles.sliderFrame}>
      <SliderButton
        isHidden={!slideButtonVisible}
        isUnmounted={pageIndex === 0}
        onClick={handleScroll}
        type={SLIDER_BUTTON_TYPES.back}/>
      <div
        onLoad={handleLoad}
        ref={sliderScrollRef}
        style={{ transform: getTranslationStyle({
          pageIndex,
          translationCoef: EPISODE_SLIDER_TRANSLATION_COEF,
          translationExp: EPISODE_SLIDER_TRANSLATION_EXP,
          cardsAmount: episodesList.length,
          cardsAmountPerPage: EPISODE_CARDS_AMOUNT,
          scrollContentWidth,
          screenWidth: window.innerWidth,
          fitLastPage: true
        })}}
        className={styles.sliderRow}>
        { renderEpisodeCards() }
      </div>
      <SliderButton
        isHidden={!slideButtonVisible}
        isUnmounted={isLastPage(pageIndex, scrollContentWidth, window.innerWidth)}
        onClick={handleScroll}
        type={SLIDER_BUTTON_TYPES.next}/>
    </div>
  );
};

export default EpisodeSlider;