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
export interface PositionCheck {
  isFirstInPage: boolean;
  isLastInPage: boolean;
}