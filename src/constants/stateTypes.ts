// @Constants
import { EpisodeData, PodcastData, PodcastEntry, SliderRef } from './types';

export type EpisodesState = {
  episodesData: EpisodeData[];
};

export type PlayerState = {
  currentPlayingId?: string;
  playingEnabled: boolean;
};

export type PodcastsState = {
  featuredPodcastData?: PodcastData;
  slidersData: PodcastEntry[];
  thumbsUp: string[];
  thumbsDown: string[];
};

export type SlidersState = {
  currentSliderId?: string;
  currentPodcastIndex: number;
  registeredSliders: SliderRef[];
};

export type StoreState = {
  episodesReducer: EpisodesState;
  playerReducer: PlayerState;
  podcastsReducer: PodcastsState;
  slidersReducer: SlidersState;
};
