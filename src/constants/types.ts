// @Vendors
import { RefObject } from "react";
import { Moment } from "moment";

export interface Duration {
  values: Array<number>;
  textKey: string;
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

export interface EpisodeData {
  relatedPodcastId: string;
  title: string;
  description: string;
  duration: number;
  date: Moment;
  posterSrc: string;
  videoSrc: string;
  website: string;
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

export interface PodcastEntry {
  sliderId: string;
  podcastsData: PodcastData[];
  sliderTitleKey: string;
  anchorTextKey: string;
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

export interface SliderCategory {
  searchKey: string;
  sliderKey: string;
  sliderShortKey: string;
}

export type getTranslationStyleArgs = {
  pageIndex: number;
  translationCoef: number;
  translationExp: string;
  cardsAmount?: number;
  cardsAmountPerPage?: Record<string, number>;
  elementsAmount: number;
  screenWidth?: number;
  fitLastPage?: boolean;
};

export type Action = {
  type: string;
  payload: Record<string, any>;
};

export type ActionSimple = {
  type: string;
};

export type SliderRef = {
  sliderId: string;
  text: string;
  ref: RefObject<any>;
};