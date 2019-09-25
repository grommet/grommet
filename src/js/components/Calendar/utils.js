// Utility functions for the Calendar.
// Just what's needed to avoid having to include a dependency like momentjs.

const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export const addDays = (date, days) => {
  const result = new Date(date.getTime() + DAY_MILLISECONDS * days);
  // Deal with crossing the daylight savings time boundary,
  // where adding a day's worth when the time is midnight results in
  // being a day off.
  let hourDelta = result.getHours() - date.getHours();
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

export const subtractDays = (date, days) => addDays(date, -days);

export const addMonths = (date, months) => {
  const result = new Date(date);
  const years = Math.floor((date.getMonth() + months) / 12);
  result.setFullYear(date.getFullYear() + years);
  const targetMonth = (date.getMonth() + months) % 12;
  result.setMonth(targetMonth < 0 ? 12 + targetMonth : targetMonth);
  return result;
};

export const subtractMonths = (date, months) => addMonths(date, -months);

export const startOfMonth = date => {
  const result = new Date(date);
  result.setDate(1);
  return result;
};

export const endOfMonth = date => {
  const result = addMonths(date, 1);
  result.setDate(0);
  return result;
};

export const sameDay = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const sameDayOrAfter = (date1, date2) =>
  date1.getFullYear() > date2.getFullYear() ||
  (date1.getFullYear() === date2.getFullYear() &&
    (date1.getMonth() > date2.getMonth() ||
      (date1.getMonth() === date2.getMonth() &&
        date1.getDate() >= date2.getDate())));

export const sameDayOrBefore = (date1, date2) =>
  date1.getFullYear() < date2.getFullYear() ||
  (date1.getFullYear() === date2.getFullYear() &&
    (date1.getMonth() < date2.getMonth() ||
      (date1.getMonth() === date2.getMonth() &&
        date1.getDate() <= date2.getDate())));

export const daysApart = (date1, date2) =>
  Math.floor((date1.getTime() - date2.getTime()) / DAY_MILLISECONDS);

// betweenDates takes and array of two elements and checks if the
// supplied date lies between them, inclusive.
// returns 2 if exact match to one end, 1 if between, undefined otherwise
export const betweenDates = (date, dates) => {
  let result;
  if (dates) {
    const [from, to] = dates.map(d => new Date(d));
    if (sameDay(date, from) || sameDay(date, to)) {
      result = 2;
    } else if (sameDayOrAfter(date, from) && sameDayOrBefore(date, to)) {
      result = 1;
    }
  } else {
    result = 1;
  }
  return result;
};

// withinDates takes and array of string dates or 2 element arrays and
// checks whether the supplied date matches any string or is between
// any dates in arrays.
// returns 2 if exact match, 1 if between, undefined otherwise
export const withinDates = (date, dates) => {
  let result;
  if (dates) {
    if (Array.isArray(dates)) {
      dates.some(d => {
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

export const updateDateRange = (
  selectedDate,
  { date, dates, previousSelectedDate },
) => {
  const result = { previousSelectedDate: selectedDate };
  if (!dates) {
    if (!date) {
      result.date = selectedDate;
    } else {
      const priorDate = new Date(date);
      const nextDate = new Date(selectedDate);
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
    const priorDates = dates[0].map(d => new Date(d));
    const previousDate = new Date(previousSelectedDate);
    const nextDate = new Date(selectedDate);
    if (nextDate.getTime() === priorDates[0].getTime()) {
      result.dates = undefined;
      [[, result.date]] = dates;
    } else if (nextDate.getTime() === priorDates[1].getTime()) {
      result.dates = undefined;
      [[result.date]] = dates;
    } else if (nextDate.getTime() < previousDate.getTime()) {
      if (nextDate.getTime() < priorDates[0].getTime()) {
        result.dates = [[selectedDate, dates[0][1]]];
      } else if (nextDate.getTime() > priorDates[0].getTime()) {
        result.dates = [[dates[0][0], selectedDate]];
      }
    } else if (nextDate.getTime() > previousDate.getTime()) {
      if (nextDate.getTime() > priorDates[1].getTime()) {
        result.dates = [[dates[0][0], selectedDate]];
      } else if (nextDate.getTime() < priorDates[1].getTime()) {
        result.dates = [[selectedDate, dates[0][1]]];
      }
    }
  }
  return result;
};
