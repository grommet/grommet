"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
function formatTime(seconds) {
  var date = new Date(null);
  seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
  date.setSeconds(seconds);

  var dateISOString = date.toISOString();
  var time = dateISOString.substr(11, 8);
  if (seconds < 3600) {
    time = dateISOString.substr(14, 5);
  }

  return time;
}