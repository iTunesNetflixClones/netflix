// @Constants
import { PodcastData, EpisodeAPIData, FeaturedPodcastAPIData, PodcastAPIData } from 'constants/types';
import {
  PODCAST_EXPLICIT,
  PODCAST_DRIVE_IMG_LINK_SUFFIX,
  PODCAST_DRIVE_LINK_PREFIX,
  PODCAST_DRIVE_LINK_SUFFIX,
  PODCAST_DRIVE_IMG_LINK_RESOLVER,
  PODCAST_DRIVE_LINK_RESOLVER
} from 'constants/constants';

// @Utils
import { getDataElement } from './commonUtils';

// @jsonFeed
import featuredFeed from 'jsonFeed/featured.json';
import episodesFeed from 'jsonFeed/episodes.json';
import podcastsFeed from 'jsonFeed/podcasts.json';

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

const buildVideoUrl = (podcast: PodcastAPIData | FeaturedPodcastAPIData): string => {
  const videoURL = getDataElement(podcast, 'Video_URL', '');
  const videoId = videoURL.replace(PODCAST_DRIVE_LINK_PREFIX, '').replace(PODCAST_DRIVE_LINK_SUFFIX, '');
  return `${PODCAST_DRIVE_LINK_RESOLVER}${videoId}`;
};

const buildImageUrl = (podcast: PodcastAPIData | FeaturedPodcastAPIData): string => {
  const imgURL = getDataElement(podcast, 'poster_src', '');
  const videoId = imgURL.replace(PODCAST_DRIVE_LINK_PREFIX, '').replace(PODCAST_DRIVE_IMG_LINK_SUFFIX, '');
  return `${PODCAST_DRIVE_IMG_LINK_RESOLVER}${videoId}`;
};

const mapPodcastAPIData = (podcast: PodcastAPIData | FeaturedPodcastAPIData): PodcastData => ({
  author: getDataElement(podcast, 'Author', ''),
  episodesAmount: countEpisodes(episodesFeed, getDataElement(podcast, 'ID', '')),
  id: getDataElement(podcast, 'ID', ''),
  isNew: false, // TODO: Define this value
  categories: mapGenres(podcast),
  coincidence: 100, // TODO: Define this value
  description: getDataElement(podcast, 'Podcast_Description', ''),
  explicit: getExplicitRate(podcast),
  posterSrc: buildImageUrl(podcast),
  title: getDataElement(podcast, 'Podcast_Title', ''),
  sliderGroups: mapSliderGroups(podcast),
  src: buildVideoUrl(podcast),
  website: getDataElement(podcast, 'Website', '')
});

export const mapPodcasts = (): PodcastData[] => {
  if(!(podcastsFeed instanceof Array)) {
    return [];
  }

  return podcastsFeed.map(mapPodcastAPIData);
};

export const mapFeaturedPodcast = (): PodcastData => {
  const featured = getDataElement(featuredFeed, '[0]', {});
  return mapPodcastAPIData(featured);
};

export const filterByCategory = (sliderCategory: string, podcasts: PodcastData[] = []): PodcastData[] => (
  podcasts.filter((podcast: PodcastData): boolean => podcast.sliderGroups.includes(sliderCategory.toLocaleLowerCase()))
);
