// @Vendors
import { RefObject } from "react";

export interface Duration {
  values: Array<number>;
  textKey: string;
}

export interface EpisodeData {
  id: string;
  description: string;
  duration: number;
  episodeNumber: number;
  link: string;
  name: string;
  src: string;
}

export interface PodcastAPIData {
  Indentifier: string;
  Podcast_Title: string;
  Podcast_Description: string;
  Website: string;
  Author: string;
  Category1: string;
  Category2: string;
  Category3: string;
  Episode_Title: string;
  Episode_Description: string;
  Duration: string;
  Episode_Date: string;
  Episode_Website: string;
  Poster_src: string;
  Rating: string;
  Video_URL: string;
  Slider_Group_1: string;
  Slider_Group_2: string;
  overview: string;
}

export interface PodcastData {
  cast: Array<string>;
  episodesAmount: number;
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
  sliderGroups: string[];
  src: string;
  year: number;
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

export type Action = {
  type: string;
  payload: Record<string, any>;
};

export type SliderRef = {
  sliderId: string;
  text: string;
  ref: RefObject<any>;
};