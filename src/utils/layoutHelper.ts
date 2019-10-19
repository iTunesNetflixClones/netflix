// @Constants
import {
  COMMON_WILDCARD,
  SCREEN_DESKTOP_MIN_WIDTH,
  SCREEN_MOBILE_LANDSCAPE_MIN_WIDTH,
  SCREEN_MOBILE_PORTRAIT_MIN_WIDTH,
  SCREEN_TABLET_MIN_WIDTH,
  VIDEO_CARDS_AMOUNT
} from '../constants/constants';
import { PositionCheck, getTranslationStyleArgs } from '../constants/types';

const getCardsAmount = (screenWidth: number, cardsPerWidth: Record<string, number>): number => {
  if(screenWidth >= SCREEN_DESKTOP_MIN_WIDTH) {
    return cardsPerWidth.DESKTOP;
  }
  if(screenWidth >= SCREEN_TABLET_MIN_WIDTH) {
    return cardsPerWidth.TABLET;
  }
  if(screenWidth >= SCREEN_MOBILE_LANDSCAPE_MIN_WIDTH) {
    return cardsPerWidth.MOBILE_LANDSCAPE;
  }
  if(screenWidth >= SCREEN_MOBILE_PORTRAIT_MIN_WIDTH) {
    return cardsPerWidth.MOBILE_PORTRAIT;
  }
  return cardsPerWidth.DESKTOP;
};

const getCardPositionInPage = (cardIndex: number, cardsPerPage: number): number => {
  return (cardIndex + 1) % cardsPerPage;
};

export const checkVideoCardPosition = (
  cardIndex: number,
  currentScreenWidth: number,
  cardsAmountPerPage: Record<string, number> = VIDEO_CARDS_AMOUNT
): PositionCheck => {
  const cardsPerPage: number = getCardsAmount(currentScreenWidth, cardsAmountPerPage);
  const cardPositionInPage: number = getCardPositionInPage(cardIndex, cardsPerPage);
  return {
    isFirstInPage: cardPositionInPage === 1,
    isLastInPage: cardIndex !== -1 && cardPositionInPage === 0
  };
};

export const isLastPage = (
  pageIndex: number,
  scrollContentWidth: number,
  screenWidth: number
): boolean => {
  return ((pageIndex + 1) * screenWidth) > scrollContentWidth;
};

const adjustTranslationCoef = (
  cardsAmount: number,
  cardsPerPage: number,
  translationCoef: number
): number => {
  return ((cardsAmount % cardsPerPage) / cardsPerPage) * translationCoef;
};

const shouldFit = (
  cardsAmount: number,
  cardsPerPage: number,
  pageIndex: number
): boolean => {
  return cardsAmount / (pageIndex * cardsPerPage) > 1.0;
};

export const getTranslationStyle = ({
  pageIndex,
  translationCoef,
  translationExp,
  cardsAmount = 0,
  cardsAmountPerPage = VIDEO_CARDS_AMOUNT,
  scrollContentWidth = 0,
  screenWidth = 0,
  fitLastPage = false
}: getTranslationStyleArgs): string => {
  let coeficient = translationCoef;
  if(fitLastPage && isLastPage(pageIndex, scrollContentWidth, screenWidth)) {
    const cardsPerPage = getCardsAmount(screenWidth, cardsAmountPerPage);
    if(shouldFit(cardsAmount, cardsPerPage, pageIndex)) {
      coeficient = adjustTranslationCoef(cardsAmount, cardsPerPage, translationCoef);
    }
  }
  const offset: number = pageIndex * coeficient;
  return translationExp.replace(COMMON_WILDCARD, offset.toString());
};