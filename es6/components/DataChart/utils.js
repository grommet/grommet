export var points = ['circle', 'diamond', 'square', 'star', 'triangle', 'triangleDown'];
export var heightYGranularity = {
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
export var halfPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall'
};
export var doublePad = {
  large: 'xlarge',
  medium: 'large',
  small: 'medium',
  xsmall: 'small',
  xxsmall: 'xsmall'
};
export var createDateFormat = function createDateFormat(firstValue, lastValue, full) {
  var dateFormat;
  var startDate = new Date(firstValue);
  var endDate = new Date(lastValue);

  if ( // check for valid dates, this is the fastest way
  !Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
    var delta = Math.abs(endDate - startDate);
    var options;
    if (delta < 60000) // less than 1 minute
      options = full ? {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: undefined
      } : {
        second: '2-digit',
        day: undefined
      };else if (delta < 3600000) // less than 1 hour
      options = full ? {
        hour: 'numeric',
        minute: '2-digit',
        day: undefined
      } : {
        minute: '2-digit',
        day: undefined
      };else if (delta < 86400000) // less than 1 day
      options = {
        hour: 'numeric'
      };else if (delta < 2592000000) // less than 30 days
      options = {
        month: full ? 'short' : 'numeric',
        day: 'numeric'
      };else if (delta < 31557600000) // less than 1 year
      options = {
        month: full ? 'long' : 'short'
      }; // 1 year or more
    else options = {
        year: 'numeric'
      };
    if (options) dateFormat = new Intl.DateTimeFormat(undefined, options).format;
  }

  return dateFormat;
};