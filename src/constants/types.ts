export interface VideoData {
  id: string;
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