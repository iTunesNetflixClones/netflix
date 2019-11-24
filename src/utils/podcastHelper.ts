// @Constants
import { PodcastData, PodcastEntry, SliderRef } from 'constants/types';

// @Utils
import { scrollToRef } from './layoutHelper';

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

export const scrollToPodcast = (sliderId: string, sliders: SliderRef[]): void => {
  const sliderData = sliders.find((slider: SliderRef): boolean => slider.sliderId === sliderId);

  if(!sliderData) {
    return;
  }

  scrollToRef(sliderData.ref);
};
