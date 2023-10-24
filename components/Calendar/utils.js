"use strict";

exports.__esModule = true;
exports.withinDates = exports.subtractMonths = exports.subtractDays = exports.startOfMonth = exports.sameDayOrBefore = exports.sameDayOrAfter = exports.sameDay = exports.handleOffset = exports.endOfMonth = exports.daysApart = exports.betweenDates = exports.addMonths = exports.addDays = void 0;
// Utility functions for the Calendar.
// Just what's needed to avoid having to include a dependency like momentjs.

var DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
var addDays = exports.addDays = function addDays(date, days) {
  var result = new Date(date.getTime() + DAY_MILLISECONDS * days);
  // Deal with crossing the daylight savings time boundary,
  // where adding a day's worth when the time is midnight results in
  // being a day off.
  var hourDelta = result.getHours() - date.getHours();
  // At this point, hourDelta is typically 0 (normal day),
  // +23 (November daylight saving), or -23 (March Daylight saving)
  // depending on which side of the switch we are on.
  // Convert so that hourDelta is either +1 or -1.
  if (hourDelta === 23) {
    hourDelta -= 24;
  } else if (hourDelta === -23) {
    hourDelta += 24;
  }
  result.setHours(result.getHours() - hourDelta);
  return result;
};
var subtractDays = exports.subtractDays = function subtractDays(date, days) {
  return addDays(date, -days);
};
var addMonths = exports.addMonths = function addMonths(date, months) {
  var result = new Date(date);
  var years = Math.floor((date.getMonth() + months) / 12);
  result.setFullYear(date.getFullYear() + years);
  var targetMonth = (date.getMonth() + months) % 12;
  result.setMonth(targetMonth < 0 ? 12 + targetMonth : targetMonth);
  return result;
};
var subtractMonths = exports.subtractMonths = function subtractMonths(date, months) {
  return addMonths(date, -months);
};
var startOfMonth = exports.startOfMonth = function startOfMonth(date) {
  var result = new Date(date);
  result.setDate(1);
  return result;
};
var endOfMonth = exports.endOfMonth = function endOfMonth(date) {
  var result = addMonths(date, 1);
  result.setDate(0);
  return result;
};
var sameDay = exports.sameDay = function sameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};
var sameDayOrAfter = exports.sameDayOrAfter = function sameDayOrAfter(date1, date2) {
  return date1.getFullYear() > date2.getFullYear() || date1.getFullYear() === date2.getFullYear() && (date1.getMonth() > date2.getMonth() || date1.getMonth() === date2.getMonth() && date1.getDate() >= date2.getDate());
};
var sameDayOrBefore = exports.sameDayOrBefore = function sameDayOrBefore(date1, date2) {
  return date1.getFullYear() < date2.getFullYear() || date1.getFullYear() === date2.getFullYear() && (date1.getMonth() < date2.getMonth() || date1.getMonth() === date2.getMonth() && date1.getDate() <= date2.getDate());
};
var daysApart = exports.daysApart = function daysApart(date1, date2) {
  return Math.floor((date1.getTime() - date2.getTime()) / DAY_MILLISECONDS);
};

// betweenDates takes an array of two elements and checks if the
// supplied date lies between them, inclusive.
// returns 2 if exact match to one end, 1 if between, undefined otherwise
var betweenDates = exports.betweenDates = function betweenDates(date, dates) {
  var result;
  if (dates) {
    var _ref = Array.isArray(dates) ? dates.map(function (d) {
        return d ? new Date(d) : undefined;
      }) : [dates, undefined],
      from = _ref[0],
      to = _ref[1];
    if (from && sameDay(date, from) || to && sameDay(date, to)) {
      result = 2;
    } else if (from && sameDayOrAfter(date, from) && to && sameDayOrBefore(date, to)) {
      result = 1;
    }
  } else {
    result = 1;
  }
  return result;
};

// withinDates takes an array of string dates or 2 element arrays and
// checks whether the supplied date matches any string or is between
// any dates in arrays.
// returns 2 if exact match, 1 if between, undefined otherwise
var withinDates = exports.withinDates = function withinDates(date, dates) {
  var result;
  if (dates) {
    if (Array.isArray(dates)) {
      dates.some(function (d) {
        if (d instanceof Date) {
          if (sameDay(date, d)) {
            result = 2;
          }
        } else {
          result = betweenDates(date, d);
        }
        return result;
      });
    } else if (sameDay(date, dates)) {
      result = 2;
    }
  }
  return result;
};
var handleOffset = exports.handleOffset = function handleOffset(date) {
  var normalizedDate = new Date(date);
  var offset = normalizedDate.getTimezoneOffset();
  var hour = normalizedDate.getHours();
  // add back offset
  normalizedDate.setHours(hour, offset < 0 ? -offset : offset);
  return normalizedDate;
};