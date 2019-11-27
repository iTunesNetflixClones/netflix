// @Vendors
import orderBy from 'lodash/orderBy';

// @Constants
import { PodcastData, EpisodeAPIData, FeaturedPodcastAPIData, PodcastAPIData, EpisodeData } from 'constants/types';
import {
  EPISODE_DESCRIPTION_MAX_LENGTH,
  PODCAST_DESCRIPTION_MAX_LENGTH,
  PODCAST_EXPLICIT,
  PODCAST_DRIVE_IMG_LINK_SUFFIX,
  PODCAST_DRIVE_LINK_PREFIX,
  PODCAST_DRIVE_LINK_SUFFIX,
  PODCAST_DRIVE_IMG_LINK_RESOLVER,
  PODCAST_DRIVE_LINK_RESOLVER
} from 'constants/constants';

// @Utils
import { getDataElement } from './commonUtils';
import { getDateObject, getDurationInMillis } from './dateHelper';

const pushCategory = (category: string, genres: string[]): void => {
  if(category) {
    genres.push(category);
  }
};

const mapGenres = (podcast: PodcastAPIData | FeaturedPodcastAPIData): string[] => {
  const genres: string[] = [];
  const cat1 = getDataElement(podcast, 'Category1', '');
  const cat2 = getDataElement(podcast, 'Category2', '');
  const cat3 = getDataElement(podcast, 'Category3', '');
  pushCategory(cat1, genres);
  pushCategory(cat2, genres);
  pushCategory(cat3, genres);
  return genres;
};

const mapSliderGroups = (podcast: PodcastAPIData | FeaturedPodcastAPIData): string[] => {
  const sliderGroups: string[] = [];
  const slider1 = getDataElement(podcast, 'Slider_Group_1', '');
  const slider2 = getDataElement(podcast, 'Slider_Group_2', '');
  pushCategory(slider1.toLocaleLowerCase(), sliderGroups);
  pushCategory(slider2.toLocaleLowerCase(), sliderGroups);
  return sliderGroups;
};

const getExplicitRate = (podcast: PodcastAPIData | FeaturedPodcastAPIData): boolean => {
  const rating = getDataElement(podcast, 'Rating', '');
  return rating.toLowerCase() === PODCAST_EXPLICIT;
};

const countEpisodes = (episodes: EpisodeAPIData[], podcastId: string): number => (
  episodes.filter((episode: EpisodeAPIData): boolean => (
    episode.ID.toLocaleLowerCase() === podcastId.toLocaleLowerCase()
  )).length
);

const buildVideoUrl = (podcast: PodcastAPIData | FeaturedPodcastAPIData | EpisodeAPIData): string => {
  const videoURL = getDataElement(podcast, 'Video_URL', '');
  const videoId = videoURL.replace(PODCAST_DRIVE_LINK_PREFIX, '').replace(PODCAST_DRIVE_LINK_SUFFIX, '');
  return `${PODCAST_DRIVE_LINK_RESOLVER}${videoId}`;
};

const buildImageUrl = (podcast: PodcastAPIData | FeaturedPodcastAPIData | EpisodeAPIData): string => {
  const imgURL = getDataElement(podcast, 'poster_src', '');
  const videoId = imgURL.replace(PODCAST_DRIVE_LINK_PREFIX, '').replace(PODCAST_DRIVE_IMG_LINK_SUFFIX, '');
  return `${PODCAST_DRIVE_IMG_LINK_RESOLVER}${videoId}`;
};

const buildDescriptionText = (description: string, maxChars: number): string => {
  if(description.length > maxChars) {
    return `${description.substring(0, maxChars)}...`;
  }
  return description;
};

const mapPodcastAPIData = (podcast: PodcastAPIData | FeaturedPodcastAPIData, episodesFeed: EpisodeAPIData[]): PodcastData => ({
  author: getDataElement(podcast, 'Author', ''),
  episodesAmount: countEpisodes(episodesFeed, getDataElement(podcast, 'ID', '')),
  id: getDataElement(podcast, 'ID', ''),
  isNew: false, // TODO: Define this value
  categories: mapGenres(podcast),
  coincidence: 100, // TODO: Define this value
  description: buildDescriptionText(getDataElement(podcast, 'Podcast_Description', ''), PODCAST_DESCRIPTION_MAX_LENGTH),
  explicit: getExplicitRate(podcast),
  posterSrc: buildImageUrl(podcast),
  title: getDataElement(podcast, 'Podcast_Title', ''),
  sliderGroups: mapSliderGroups(podcast),
  src: buildVideoUrl(podcast),
  website: getDataElement(podcast, 'Website', '')
});

const mapEpisodeAPIData = (episode: EpisodeAPIData): EpisodeData => ({
  relatedPodcastId: getDataElement(episode, 'ID', ''),
  title: getDataElement(episode, 'Episode_Title', ''),
  description: buildDescriptionText(getDataElement(episode, 'Episode_Description', ''), EPISODE_DESCRIPTION_MAX_LENGTH),
  duration: getDurationInMillis(getDataElement(episode, 'Duration', '00:00:00')),
  date: getDateObject(getDataElement(episode, 'Episode_Date', '01/01/1900')),
  website: getDataElement(episode, 'Episode_Website', ''),
  videoSrc: buildVideoUrl(episode),
  posterSrc: buildImageUrl(episode)
});

export const mapPodcasts = (podcastsFeed: PodcastAPIData[], episodesFeed: EpisodeAPIData[]): PodcastData[] => {
  if(!(podcastsFeed instanceof Array)) {
    return [];
  }

  return podcastsFeed.map((podcast: PodcastAPIData): PodcastData => mapPodcastAPIData(podcast, episodesFeed));
};

export const mapEpisodes = (podcastId: string, episodesFeed: EpisodeAPIData[]): EpisodeData[] => {
  if(!(episodesFeed instanceof Array)) {
    return [];
  }

  const episodesData = episodesFeed
    .filter((episode: EpisodeAPIData): boolean => episode.ID === podcastId)
    .map(mapEpisodeAPIData);

  return orderBy(episodesData, ['date'], ['desc']);
};

export const mapFeaturedPodcast = (featuredFeed: PodcastAPIData[], episodesFeed: EpisodeAPIData[]): PodcastData => {
  const featured = getDataElement(featuredFeed, '[0]', {});
  return mapPodcastAPIData(featured, episodesFeed);
};

export const filterByCategory = (sliderCategory: string, podcasts: PodcastData[] = []): PodcastData[] => (
  podcasts.filter((podcast: PodcastData): boolean => podcast.sliderGroups.includes(sliderCategory.toLocaleLowerCase()))
);
