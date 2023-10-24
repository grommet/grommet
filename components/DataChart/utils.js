"use strict";

exports.__esModule = true;
exports.showInUnits = exports.points = exports.minimum = exports.maximum = exports.largestSize = exports.heightYGranularity = exports.halfPad = exports.doublePad = exports.createDateFormat = void 0;
var _Chart = require("../Chart");
var points = exports.points = ['circle', 'diamond', 'square', 'star', 'triangle', 'triangleDown'];
var heightYGranularity = exports.heightYGranularity = {
  xxsmall: {
    fine: 2,
    medium: 2
  },
  xsmall: {
    fine: 3,
    medium: 2
  },
  small: {
    fine: 5,
    medium: 3
  },
  medium: {
    fine: 7,
    medium: 5
  },
  large: {
    fine: 9,
    medium: 5
  },
  xlarge: {
    fine: 11,
    medium: 5
  }
};
var halfPad = exports.halfPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall'
};
var doublePad = exports.doublePad = {
  large: 'xlarge',
  medium: 'large',
  small: 'medium',
  xsmall: 'small',
  xxsmall: 'xsmall'
};
var orderedSizes = ['xlarge', 'large', 'medium', 'small', 'xsmall', 'xxsmall', 'hair'];
var showInUnits = exports.showInUnits = function showInUnits(content, maxValue) {
  var divideBy;
  var unit;
  var newContent = content;
  if (maxValue > 10000000) {
    divideBy = 1000000;
    unit = 'M';
  } else if (maxValue > 10000) {
    divideBy = 1000;
    unit = 'K';
  }
  if (divideBy) newContent = (0, _Chart.round)(newContent / divideBy, 0);
  if (unit) newContent = "" + newContent + unit;
  return newContent;
};
var largestSize = exports.largestSize = function largestSize(size1, size2) {
  if (size1 && !size2) return size1;
  if (size2 && !size1) return size2;
  if (orderedSizes.indexOf(size1) < orderedSizes.indexOf(size2)) return size1;
  return size2;
};
var createDateFormat = exports.createDateFormat = function createDateFormat(firstValue, lastValue, full) {
  var dateFormat;
  var startDate = new Date(firstValue);
  var endDate = new Date(lastValue);
  if (
  // check for valid dates, this is the fastest way
  !Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
    var delta = Math.abs(endDate - startDate);
    var options;
    if (delta < 60000)
      // less than 1 minute
      options = full ? {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: undefined
      } : {
        second: '2-digit',
        day: undefined
      };else if (delta < 3600000)
      // less than 1 hour
      options = full ? {
        hour: 'numeric',
        minute: '2-digit',
        day: undefined
      } : {
        minute: '2-digit',
        day: undefined
      };else if (delta < 86400000)
      // less than 1 day
      options = {
        hour: 'numeric'
      };else if (delta < 2592000000)
      // less than 30 days
      options = {
        month: full ? 'short' : 'numeric',
        day: 'numeric'
      };else if (delta < 31557600000)
      // less than 1 year
      options = {
        month: full ? 'long' : 'short'
      };
      // 1 year or more
    else options = {
      year: 'numeric'
    };
    if (options) dateFormat = new Intl.DateTimeFormat(undefined, options).format;
  }
  return dateFormat;
};
var minimum = exports.minimum = function minimum(value1, value2) {
  return value1 !== undefined ? Math.min(value1, value2) : value2;
};
var maximum = exports.maximum = function maximum(value1, value2) {
  return value1 !== undefined ? Math.max(value1, value2) : value2;
};