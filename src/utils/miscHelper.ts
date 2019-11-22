export const getParentalAgeText = (parentalAge?: boolean): string => (
  parentalAge ? 'player-parentalExplicit' : 'player-parentalAll'
);
