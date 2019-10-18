export interface VideoData {
  id: string;
  isSeries: boolean;
  coincidence: number;
  description: string;
  duration: number;
  parentalAge: number;
  posterSrc: string;
  tags: Array<string>;
  title: string;
  src: string;
}
export interface PositionCheck {
  isFirstInPage: boolean;
  isLastInPage: boolean;
}