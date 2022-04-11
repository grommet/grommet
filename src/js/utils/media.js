// return the time in a format of minutes:seconds.
// if time is undefined, return '' to avoid NaN.
export const formatTime = (time) => {
  if (time) {
    let minutes = Math.round(time / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let seconds = Math.round(time) % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  return '';
};
