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

export interface FeaturedPodcastAPIData {
  ID: string;
  Podcast_Title: string;
  Podcast_Description: string;
  Website: string;
  Video_URL: string;
  poster_src: string;
}

export interface PodcastAPIData extends FeaturedPodcastAPIData {
  Author: string;
  Category1: string;
  Category2: string;
  Category3: string;
  Rating: string;
  Slider_Group_1: string;
  Slider_Group_2: string;
}

export interface PodcastData {
  author: string;
  episodesAmount: number;
  id: string;
  isNew: boolean;
  categories: Array<string>;
  coincidence: number;
  description: string;
  explicit: boolean;
  posterSrc: string;
  title: string;
  sliderGroups: string[];
  src: string;
  website: string;
}

export interface EpisodeAPIData {
  ID: string;
  Episode_Title: string;
  Episode_Description: string;
  Duration: string;
  Episode_Date: string;
  Episode_Website: string;
  Video_URL: string;
  poster_src: string;
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