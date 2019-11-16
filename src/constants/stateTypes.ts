// @Constants
import { SliderRef } from './types';

export type PlayerState = {
  currentPlayingId?: string;
  playingEnabled: boolean;
};

export type SlidersState = {
  currentSliderId?: string;
  registeredSliders: SliderRef[];
};

export type StoreState = {
  playerReducer: PlayerState;
  slidersReducer: SlidersState;
};
