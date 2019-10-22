export type PlayerState = {
  currentPlayingId?: string;
};

export type SlidersState = {
  currentSliderId?: string;
};

export type StoreState = {
  playerReducer: PlayerState;
  slidersReducer: SlidersState;
};
