// return the time in a format of minutes:seconds. if time is not defined, return '' to avoid NaN.
export const formatTime = time => {
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

export const mediaEvents = [
  'onAbort',
  'onCanPlay',
  'onCanPlayThrough',
  'onDurationChange',
  'onEmptied',
  'onEncrypted',
  'onEnded',
  'onError',
  'onLoadedData',
  'onLoadedMetadata',
  'onLoadStart',
  'onPause',
  'onPlay',
  'onPlaying',
  'onProgress',
  'onRateChange',
  'onSeeked',
  'onSeeking',
  'onStalled',
  'onSuspend',
  'onTimeUpdate',
  'onVolumeChange',
  'onWaiting',
];
