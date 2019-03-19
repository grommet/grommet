// Utility functions for the Calendar.
// Just what's needed to avoid having to include a dependency like momentjs.
var DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
export var addDays = function addDays(date, days) {
  var result = new Date(date.getTime() + DAY_MILLISECONDS * days); // Deal with crossing the daylight savings time boundary,
  // where adding a day's worth when the time is midnight results in
  // being a day off.

  var hourDelta = result.getHours() - date.getHours(); // At this point, hourDelta is typically 0 (normal day), +23 (November daylight saving), or -23 (March Daylight saving)
  // depending on which side of the switch we are on. Convert so that hourDelta is either +1 or -1.

  if (hourDelta === 23) {
    hourDelta -= 24;
  } else if (hourDelta === -23) {
    hourDelta += 24;
  }

  result.setHours(result.getHours() - hourDelta);
  return result;
};
export var subtractDays = function subtractDays(date, days) {
  return addDays(date, -days);
};
export var addMonths = function addMonths(date, months) {
  var result = new Date(date);
  var years = Math.floor((date.getMonth() + months) / 12);
  result.setFullYear(date.getFullYear() + years);
  var targetMonth = (date.getMonth() + months) % 12;
  result.setMonth(targetMonth < 0 ? 12 + targetMonth : targetMonth);
  return result;
};
export var subtractMonths = function subtractMonths(date, months) {
  return addMonths(date, -months);
};
export var startOfMonth = function startOfMonth(date) {
  var result = new Date(date);
  result.setDate(1);
  return result;
};
export var endOfMonth = function endOfMonth(date) {
  var result = addMonths(date, 1);
  result.setDate(0);
  return result;
};
export var sameDay = function sameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};
export var sameDayOrAfter = function sameDayOrAfter(date1, date2) {
  return date1.getFullYear() > date2.getFullYear() || date1.getFullYear() === date2.getFullYear() && (date1.getMonth() > date2.getMonth() || date1.getMonth() === date2.getMonth() && date1.getDate() >= date2.getDate());
};
export var sameDayOrBefore = function sameDayOrBefore(date1, date2) {
  return date1.getFullYear() < date2.getFullYear() || date1.getFullYear() === date2.getFullYear() && (date1.getMonth() < date2.getMonth() || date1.getMonth() === date2.getMonth() && date1.getDate() <= date2.getDate());
};
export var daysApart = function daysApart(date1, date2) {
  return Math.floor((date1.getTime() - date2.getTime()) / DAY_MILLISECONDS);
}; // betweenDates takes and array of two elements and checks if the
// supplied date lies between them, inclusive.
// returns 2 if exact match to one end, 1 if between, undefined otherwise

export var betweenDates = function betweenDates(date, dates) {
  var result;

  if (dates) {
    var _dates$map = dates.map(function (d) {
      return new Date(d);
    }),
        from = _dates$map[0],
        to = _dates$map[1];

    if (sameDay(date, from) || sameDay(date, to)) {
      result = 2;
    } else if (sameDayOrAfter(date, from) && sameDayOrBefore(date, to)) {
      result = 1;
    }
  } else {
    result = 1;
  }

  return result;
}; // withinDates takes and array of string dates or 2 element arrays and
// checks whether the supplied date matches any string or is between
// any dates in arrays.
// returns 2 if exact match, 1 if between, undefined otherwise

export var withinDates = function withinDates(date, dates) {
  var result;

  if (dates) {
    if (Array.isArray(dates)) {
      dates.some(function (d) {
        if (typeof d === 'string') {
          if (sameDay(date, new Date(d))) {
            result = 2;
          }
        } else {
          result = betweenDates(date, d);
        }

        return result;
      });
    } else if (sameDay(date, new Date(dates))) {
      result = 2;
    }
  }

  return result;
};
export var updateDateRange = function updateDateRange(selectedDate, _ref) {
  var date = _ref.date,
      dates = _ref.dates,
      previousSelectedDate = _ref.previousSelectedDate;
  var result = {
    previousSelectedDate: selectedDate
  };

  if (!dates) {
    if (!date) {
      result.date = selectedDate;
    } else {
      var priorDate = new Date(date);
      var nextDate = new Date(selectedDate);

      if (priorDate.getTime() < nextDate.getTime()) {
        result.date = undefined;
        result.dates = [[date, selectedDate]];
      } else if (priorDate.getTime() > nextDate.getTime()) {
        result.date = undefined;
        result.dates = [[selectedDate, date]];
      } else {
        result.date = undefined;
      }
    }
  } else {
    var priorDates = dates[0].map(function (d) {
      return new Date(d);
    });
    var previousDate = new Date(previousSelectedDate);

    var _nextDate = new Date(selectedDate);

    if (_nextDate.getTime() === priorDates[0].getTime()) {
      result.dates = undefined;
      var _dates$ = dates[0];
      result.date = _dates$[1];
    } else if (_nextDate.getTime() === priorDates[1].getTime()) {
      result.dates = undefined;
      var _dates$2 = dates[0];
      result.date = _dates$2[0];
    } else if (_nextDate.getTime() < previousDate.getTime()) {
      if (_nextDate.getTime() < priorDates[0].getTime()) {
        result.dates = [[selectedDate, dates[0][1]]];
      } else if (_nextDate.getTime() > priorDates[0].getTime()) {
        result.dates = [[dates[0][0], selectedDate]];
      }
    } else if (_nextDate.getTime() > previousDate.getTime()) {
      if (_nextDate.getTime() > priorDates[1].getTime()) {
        result.dates = [[dates[0][0], selectedDate]];
      } else if (_nextDate.getTime() < priorDates[1].getTime()) {
        result.dates = [[selectedDate, dates[0][1]]];
      }
    }
  }

  return result;
};