// @Constants
import {
  SCREEN_DESKTOP_MIN_WIDTH,
  SCREEN_MOBILE_LANDSCAPE_MIN_WIDTH,
  SCREEN_MOBILE_PORTRAIT_MIN_WIDTH,
  SCREEN_TABLET_MIN_WIDTH,
  VIDEO_CARDS_AMOUNT
} from '../constants/constants';
import { PositionCheck } from '../constants/types';

const getVideoCardsAmount = (screenWidth: number): number => {
  if(screenWidth >= SCREEN_DESKTOP_MIN_WIDTH) {
    return VIDEO_CARDS_AMOUNT.DESKTOP;
  }
  if(screenWidth >= SCREEN_TABLET_MIN_WIDTH) {
    return VIDEO_CARDS_AMOUNT.TABLET;
  }
  if(screenWidth >= SCREEN_MOBILE_LANDSCAPE_MIN_WIDTH) {
    return VIDEO_CARDS_AMOUNT.MOBILE_LANDSCAPE;
  }
  if(screenWidth >= SCREEN_MOBILE_PORTRAIT_MIN_WIDTH) {
    return VIDEO_CARDS_AMOUNT.MOBILE_PORTRAIT;
  }
  return VIDEO_CARDS_AMOUNT.DESKTOP;
};

const getCardPositionInPage = (cardIndex: number, cardsPerPage: number): number => {
  return (cardIndex + 1) % cardsPerPage;
};

export const checkVideoCardPosition = (cardIndex: number, currentScreenWidth: number): PositionCheck => {
  const cardsPerPage: number = getVideoCardsAmount(currentScreenWidth);
  const cardPositionInPage: number = getCardPositionInPage(cardIndex, cardsPerPage);
  return {
    isFirstInPage: cardPositionInPage === 1,
    isLastInPage: cardPositionInPage === 0
  };
};