export type PlayerState = {
  currentPlayingId?: string;
  playingEnabled: boolean;
};

export type SlidersState = {
  currentSliderId?: string;
};

export type StoreState = {
  playerReducer: PlayerState;
  slidersReducer: SlidersState;
};
