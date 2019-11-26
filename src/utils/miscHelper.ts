// @Vendors
import React from 'react';

export const getParentalAgeText = (parentalAge?: boolean): string => (
  parentalAge ? 'player-parentalExplicit' : 'player-parentalAll'
);

export const propagationPreventer = (e: React.MouseEvent<HTMLElement>, action?: () => any): any => {
  e.preventDefault();
  e.stopPropagation();
  if(action) {
    action();
  }
};
