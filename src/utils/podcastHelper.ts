// @Constants
import { PodcastData, PodcastEntry, SliderRef } from 'constants/types';
import { FEATURED_SCROLL_EXTRA_OFFSET, VIDEO_SLIDER_TRANSLATION_COEF, VIDEO_CARDS_AMOUNT } from 'constants/constants';

// @Utils
import { getCardsAmount, scrollToRef } from './layoutHelper';

export const findPodcastInSliders = (
  searchId: string, podcastsData: PodcastEntry[] = []
): PodcastEntry | undefined => {
  return podcastsData.find((podcastEntry: PodcastEntry): boolean => (
    Boolean(podcastEntry.podcastsData.find((podcast: PodcastData): boolean => (
      podcast.id === searchId
    ))
  )));
};

export const getPodcastIndex = (searchId: string, podcasts: PodcastData[] = []): number => {
  let podcastIndex = -1;
  podcasts.forEach((podcast: PodcastData, index: number): void => {
    if(podcast.id === searchId) {
      podcastIndex = index;
      return;
    }
  });
  return podcastIndex;
};

const calculateExtraOffset = (): number => {
  const cardsAmount = getCardsAmount(window.innerWidth, VIDEO_CARDS_AMOUNT);
  return FEATURED_SCROLL_EXTRA_OFFSET + (window.innerWidth * VIDEO_SLIDER_TRANSLATION_COEF / 100) / cardsAmount;
};

export const scrollToPodcast = (sliderId: string, sliders: SliderRef[]): void => {
  const sliderData = sliders.find((slider: SliderRef): boolean => slider.sliderId === sliderId);

  if(!sliderData) {
    return;
  }

  const extraOffset = calculateExtraOffset();
  scrollToRef(sliderData.ref, extraOffset);
};
