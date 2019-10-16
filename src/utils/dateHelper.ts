export type Duration = {
  values: Array<number>;
  textKey: string;
};

export const formatDuration = (timeInMs: number): Duration => {
  const hours: number = Math.floor(timeInMs / (60000 * 60));
  const mins: number = Math.floor(timeInMs % (60000 * 60) / 60000);
  if(hours) {
    return {
      values:[hours, mins],
      textKey: 'duration-fullTime'
    };
  }
  return {
    values:[mins],
    textKey: 'duration-onlyMins'
  };
};
