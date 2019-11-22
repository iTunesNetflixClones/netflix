// @Constants
import { PodcastData, PodcastAPIData } from 'constants/types';
import {
  PODCAST_EXPLICIT,
  PODCAST_EXPLICIT_AGE,
  PODCAST_OVERVIEW_INDICATOR,
  PODCAST_DRIVE_LINK_PREFIX,
  PODCAST_DRIVE_LINK_SUFFIX,
  PODCAST_DRIVE_LINK_RESOLVER
} from 'constants/constants';

// @Utils
import { getDurationInMilis } from './dateHelper';

// @jsonFeed
const featuredFeed: PodcastAPIData = require('jsonFeed/featured.json');
const episodesFeed: PodcastAPIData[] = require('jsonFeed/episodes.json');

const pushCategory = (category: string, genres: string[]): void => {
  if(category) {
    genres.push(category);
  }
};

const mapGenres = (cat1: string, cat2: string, cat3: string): string[] => {
  const genres: string[] = [];
  pushCategory(cat1, genres);
  pushCategory(cat2, genres);
  pushCategory(cat3, genres);
  return genres;
};

const mapSliderGroups = (slider1: string, slider2: string): string[] => {
  const sliderGroups: string[] = [];
  pushCategory(slider1.toLocaleLowerCase(), sliderGroups);
  pushCategory(slider2.toLocaleLowerCase(), sliderGroups);
  return sliderGroups;
};

const getParentalAge = (rating: string): number => {
  if(rating.toLowerCase() === PODCAST_EXPLICIT) {
    return PODCAST_EXPLICIT_AGE;
  }
  return 0;
};

const countEpisodes = (podcasts: PodcastAPIData[], podcastTitle: string): number => (
  podcasts.filter((podcast: PodcastAPIData): boolean => (
    podcast.Podcast_Title.toLocaleLowerCase() === podcastTitle.toLocaleLowerCase()
  )).length
);

const buildVideoUrl = (videoURL: string): string => {
  const videoId = videoURL.replace(PODCAST_DRIVE_LINK_PREFIX, '').replace(PODCAST_DRIVE_LINK_SUFFIX, '');
  return `${PODCAST_DRIVE_LINK_RESOLVER}${videoId}`;
};

const mapPodcastAPIData = (podcast: PodcastAPIData): PodcastData => ({
  cast: [podcast.Author],
  episodesAmount: countEpisodes(episodesFeed, podcast.Podcast_Title),
  id: podcast.Podcast_Title,
  isNew: false, // TODO: define this field
  isSeries: true,
  coincidence: 0, // TODO: define this field
  description: podcast.Podcast_Description,
  duration: getDurationInMilis(podcast.Duration),
  genres: mapGenres(podcast.Category1, podcast.Category2, podcast.Category3),
  parentalAge: getParentalAge(podcast.Rating),
  posterSrc: podcast.Poster_src,
  tags: mapGenres(podcast.Category1, podcast.Category2, podcast.Category3),
  title: podcast.Podcast_Title,
  seasonsAmount: 0,
  sliderGroups: mapSliderGroups(podcast.Slider_Group_1, podcast.Slider_Group_2),
  src: buildVideoUrl(podcast.Video_URL),
  year: 0
});

export const mapPodcasts = (): PodcastData[] => {
  if(!(episodesFeed instanceof Array)) {
    return [];
  }

  return episodesFeed
    .filter((podcast: PodcastAPIData): boolean => podcast.overview.toLowerCase() === PODCAST_OVERVIEW_INDICATOR)
    .map(mapPodcastAPIData);
};

export const mapFeaturedPodcast = (): PodcastData => {
  return mapPodcastAPIData(featuredFeed);
};

export const filterByCategory = (sliderCategory: string, podcasts: PodcastData[] = []): PodcastData[] => (
  podcasts.filter((podcast: PodcastData): boolean => podcast.sliderGroups.includes(sliderCategory.toLocaleLowerCase()))
);
