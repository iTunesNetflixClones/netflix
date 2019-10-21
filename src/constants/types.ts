export interface Duration {
  values: Array<number>;
  textKey: string;
}

export interface EpisodeData {
  id: string;
  description: string;
  duration: number;
  episodeNumber: number;
  imageSrc: string;
  videoSrc: string;
}

export interface PositionCheck {
  isFirstInPage: boolean;
  isLastInPage: boolean;
}

export interface SelectorOption {
  code: string;
  textKey?: string;
  value: string | number;
}

export interface VideoData {
  cast: Array<string>;
  id: string;
  isNew: boolean;
  isSeries: boolean;
  coincidence: number;
  description: string;
  duration: number;
  genres: Array<string>;
  parentalAge: number;
  posterSrc: string;
  tags: Array<string>;
  title: string;
  seasonsAmount?: number;
  src: string;
  year: number;
}

export type getTranslationStyleArgs = {
  pageIndex: number;
  translationCoef: number;
  translationExp: string;
  cardsAmount?: number;
  cardsAmountPerPage?: Record<string, number>;
  scrollContentWidth?: number;
  screenWidth?: number;
  fitLastPage?: boolean;
};