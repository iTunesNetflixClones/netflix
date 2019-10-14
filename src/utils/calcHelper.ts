export const interpolateScroll = ({
  scrollPos,
  inputRange,
  outputRange
}: {
  scrollPos: number;
  inputRange: Array<number>;
  outputRange: Array<number>;
}): number => {
  if (scrollPos < Math.min(inputRange[0], inputRange[1])) {
    return Math.min(inputRange[0], inputRange[1]) === inputRange[0]
      ? outputRange[0]
      : outputRange[1];
  }
  if (scrollPos > Math.max(inputRange[0], inputRange[1])) {
    return Math.max(inputRange[0], inputRange[1]) === inputRange[0]
      ? outputRange[0]
      : outputRange[1];
  }
  const coef: number =
    (scrollPos - inputRange[0]) /
    (scrollPos - inputRange[0] + inputRange[1] - scrollPos);
  return (
    Math.abs(outputRange[1] - outputRange[0]) * coef +
    Math.min(outputRange[0], outputRange[1])
  );
};
