export function formatTime(seconds) {
  const date = new Date(null);
  seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
  date.setSeconds(seconds);

  const dateISOString = date.toISOString();
  let time = dateISOString.substr(11, 8);
  if (seconds < 3600) {
    time = dateISOString.substr(14, 5);
  }

  return time;
}
