// @Vendors
import { RefObject } from 'react';

// @Constants
import {
  COMMON_WILDCARD,
  SCREEN_DESKTOP_MIN_WIDTH,
  SCREEN_MOBILE_LANDSCAPE_MIN_WIDTH,
  SCREEN_MOBILE_PORTRAIT_MIN_WIDTH,
  SCREEN_TABLET_MIN_WIDTH,
  SCROLL_TOPBAR_OFF_SET_CORRECTOR,
  VIDEO_CARDS_AMOUNT
} from 'constants/constants';
import { PositionCheck, getTranslationStyleArgs } from 'constants/types';
import { BUTTON_SIZES } from 'constants/enums';

// @Utils
import { getDataElement } from './commonUtils';

export const getCardsAmount = (screenWidth: number, cardsPerWidth: Record<string, number>): number => {
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
  screenWidth: number,
  cardsPerPageCfg: Record<string, number>,
  totalElements: number
): boolean => {
  const cardsPerPage = getCardsAmount(screenWidth, cardsPerPageCfg);
  return ((pageIndex + 1) * cardsPerPage) >= totalElements;
};

const adjustTranslationCoef = (
  cardsAmount: number,
  cardsPerPage: number,
  translationCoef: number
): number => {
  if(cardsAmount % cardsPerPage === 0) {
    return translationCoef;
  }
  return ((cardsAmount % cardsPerPage) / cardsPerPage) * translationCoef;
};

const shouldFit = (
  cardsAmount: number,
  cardsPerPage: number,
  pageIndex: number
): boolean => {
  return cardsAmount / (pageIndex * cardsPerPage) >= 1.0;
};

export const getTranslationStyle = ({
  pageIndex,
  translationCoef,
  translationExp,
  cardsAmount = 0,
  cardsAmountPerPage = VIDEO_CARDS_AMOUNT,
  elementsAmount = 0,
  screenWidth = 0,
  fitLastPage = false
}: getTranslationStyleArgs): string => {
  let coeficient = translationCoef;
  if(fitLastPage && isLastPage(pageIndex, screenWidth, cardsAmountPerPage, elementsAmount)) {
    const cardsPerPage = getCardsAmount(screenWidth, cardsAmountPerPage);
    if(shouldFit(cardsAmount, cardsPerPage, pageIndex)) {
      coeficient = adjustTranslationCoef(cardsAmount, cardsPerPage, translationCoef);
    }
  }
  const offset: number = (pageIndex - 1) * translationCoef + coeficient;
  return translationExp.replace(COMMON_WILDCARD, offset.toString());
};

const buildButtonSylesObject = (
  styleClass: string,
  styleClassName: string
): Record<string, string> => ({
  baseButtonClass: styleClass,
  baseButtonClassName: styleClassName
}

);

export const getButtonSizeStyle = (
  styles: Record<string, any>,
  size?: BUTTON_SIZES
): Record<string, string> => {
  switch(size) {
    case BUTTON_SIZES.small:
      return buildButtonSylesObject(styles.buttonAreaSmall, 'buttonAreaSmall');
    case BUTTON_SIZES.regular:
      return buildButtonSylesObject(styles.buttonArea, 'buttonArea');
    case BUTTON_SIZES.big:
      return buildButtonSylesObject(styles.buttonAreaBig, 'buttonAreaBig');
    default:
      return buildButtonSylesObject(styles.buttonArea, 'buttonArea');
  }
};

export const getLastPageIndex = (
  windowWidth: number,
  cardsAmount: number,
  cardsPerPageMap: Record<string, number>
): number => {
  const cardsAmountPerPage = getCardsAmount(windowWidth, cardsPerPageMap);
  return Math.ceil(cardsAmount / cardsAmountPerPage) - 1;
};

export const scrollToRef = (ref: RefObject<any>, extraOffset: number = 0): void => {
  const currentRef = getDataElement(ref, 'current', null);
  if(currentRef && currentRef.getBoundingClientRect) {
    const offset = ref.current.getBoundingClientRect().top + window.pageYOffset + SCROLL_TOPBAR_OFF_SET_CORRECTOR;
    window.scrollTo(0, offset + extraOffset);
  }
};
