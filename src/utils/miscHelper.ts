export const getParentalAgeText = (parentalAge?: number): string => (
  parentalAge ? 'player-parentalAdvice' : 'player-parentalAll'
);
