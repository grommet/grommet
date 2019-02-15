export const formatTime = time => {
  let minutes = Math.round(time / 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = Math.round(time) % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
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
