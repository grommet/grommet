import { setHoursWithOffset } from '../../utils';
import { handleOffset } from '../Calendar/utils';

// Converting between Date and String types is handled via a "schema".
// The schema is an array of strings, split into strings with identical
// characters. So, 'mm/dd/yyyy' will be ['mm', '/', 'dd', '/', 'yyyyy'].
export const formatToSchema = (format) => {
  if (!format) return undefined;
  const result = [];

  let i = 0;
  let part;
  while (i < format.length) {
    if (!part || part[0] !== format[i]) {
      if (part) result.push(part);
      part = format[i];
    } else {
      part += format[i];
    }
    i += 1;
  }
  if (part) result.push(part);

  return result;
};

const masks = {
  m: { length: [1, 2], regexp: /^[1-9]$|^1[0-2]$/ },
  mm: { length: [1, 2], regexp: /^[0-1]$|^0[1-9]$|^1[0-2]$/ },
  d: { length: [1, 2], regexp: /^[1-9]$|^[1-2][0-9]$|^3[0-1]$/ },
  dd: {
    length: [1, 2],
    regexp: /^[0-3]$|^0[1-9]$|^[1-2][0-9]$|^3[0-1]$/,
  },
  yy: { length: [1, 2], regexp: /^[0-9]{1,2}$/ },
  yyyy: { length: [1, 4], regexp: /^[0-9]{1,4}$/ },
};

export const schemaToMask = (schema) => {
  if (!schema) return undefined;
  return schema.map((part) => {
    const lower = part.toLowerCase();
    const char = lower[0];
    if (char === 'm' || char === 'd' || char === 'y')
      return { placeholder: part, ...masks[lower] };
    return { fixed: part };
  });
};

// convert value into text representation using the schema
export const valueToText = (value, schema) => {
  let text = '';
  // when user initializes dates as empty array, we want to still
  // show the placeholder text
  if (!value || (Array.isArray(value) && !value.length)) return text;

  const dates = (Array.isArray(value) ? value : [value]).map((v) =>
    setHoursWithOffset(v),
  );

  let dateIndex = 0;
  let parts = {};
  schema.every((part) => {
    const char = part[0].toLowerCase();
    // advance dateIndex if we already have this part
    while (
      dateIndex < dates.length &&
      (Number.isNaN(dates[dateIndex].date) ||
        ((char === 'm' || char === 'd' || char === 'y') && parts[part]))
    ) {
      dateIndex += 1;
      parts = {};
    }
    const date = dates[dateIndex];

    if (date && part === 'm') {
      text += date.getMonth() + 1;
      parts[part] = true;
    } else if (date && part === 'mm') {
      text += `0${date.getMonth() + 1}`.slice(-2);
      parts[part] = true;
    } else if (date && part === 'd') {
      text += date.getDate();
      parts[part] = true;
    } else if (date && part === 'dd') {
      text += `0${date.getDate()}`.slice(-2);
      parts[part] = true;
    } else if (date && part === 'yy') {
      text += date.getFullYear().toString().slice(-2);
      parts[part] = true;
    } else if (date && part === 'yyyy') {
      text += date.getFullYear();
      parts[part] = true;
    } else if (
      !date &&
      (part[0] === 'm' || part[0] === 'd' || part[0] === 'y')
    ) {
      return false;
    } else {
      text += part;
    }
    return true;
  });

  return text;
};

const charCodeZero = '0'.charCodeAt(0);
const charCodeNine = '9'.charCodeAt(0);

const pullDigits = (text, index) => {
  let end = index;
  while (
    text.charCodeAt(end) >= charCodeZero &&
    text.charCodeAt(end) <= charCodeNine
  )
    end += 1;
  return text.slice(index, end);
};

export const validateBounds = (dateBounds, selectedDate) => {
  if (!dateBounds || !selectedDate) return selectedDate;

  const [startDate, endDate] = dateBounds.map((date) =>
    setHoursWithOffset(date).toISOString(),
  );

  const isoSelectedDates = (
    Array.isArray(selectedDate) ? selectedDate : [selectedDate]
  ).map((date) => setHoursWithOffset(date).toISOString());

  const validSelection = isoSelectedDates.every(
    (isoSelectedDate) =>
      (!endDate && startDate === isoSelectedDate) ||
      (isoSelectedDate >= startDate && isoSelectedDate <= endDate),
  );

  return validSelection ? selectedDate : undefined;
};

export const textToValue = (text, schema, range, reference, outputFormat) => {
  if (!text) return range ? [] : undefined;

  let result;

  const addDate = (parts) => {
    const leapYear =
      (parts.y % 4 === 0 && parts.y % 100 !== 0) || parts.y % 400 === 0;

    // Do a little sanity checking on the parts first.
    // If not valid, leave as is.
    if (
      !parts.m ||
      !parts.d ||
      !parts.y ||
      parts.y.length < 4 ||
      parts.m.length > 2 ||
      parts.d.length > 2 ||
      parts.m > 12 ||
      parts.d > 31 ||
      ((parts.m === `02` || parts.m === `2`) && parts.d > (leapYear ? 29 : 28))
    )
      return parts;

    // use time info from reference date
    const time = reference
      ? [
          reference.getHours(),
          reference.getMinutes(),
          reference.getSeconds(),
          reference.getMilliseconds(),
        ]
      : null;

    let date = new Date(parts.y, parts.m - 1, parts.d, ...time).toISOString();

    if (date && outputFormat === 'no timezone') {
      [date] = handleOffset(date).toISOString().split('T');
    }

    if (!range) {
      if (!result) result = date;
    } else {
      if (!result) result = [];
      result.push(date);
    }
    // we've consumed these parts, return an empty object in case we need
    // to start building up another one for a range
    return {};
  };

  let parts = {};
  let index = 0;
  schema.forEach((part) => {
    if (index < text.length) {
      const lower = part.toLowerCase();
      const char = lower[0];
      if (parts[char] !== undefined) parts = addDate(parts);

      if (char === 'm') {
        parts.m = pullDigits(text, index);
        index += parts.m.length;
      } else if (char === 'd') {
        parts.d = pullDigits(text, index);
        // when format is something like yyyy/mm/dd,
        // '0' as incomplete day can cause date to be
        // prematurely calculated.
        // ex: 2022/01/0 would reutrn 2021/12/31 in addDate()
        if (parts.d === '0') delete parts.d;
        index += parts?.d?.length || 0;
      } else if (char === 'y') {
        parts.y = pullDigits(text, index);
        index += parts.y.length;
        if (lower === 'yy' && parts.y.length === 2) {
          // convert to full year, pivot at 69 based on POSIX strptime()
          parts.y = `${parts.y < 69 ? 20 : 19}${parts.y}`;
        }
      } else if (text.slice(index, index + part.length) === part) {
        index += part.length;
      } else {
        // syntax error
        index = text.length;
        result = undefined;
      }
    }
  });
  parts = addDate(parts);

  if (!result) return range ? [] : undefined;
  return result;
};

export const valuesAreEqual = (value1, value2) =>
  (Array.isArray(value1) &&
    Array.isArray(value2) &&
    value1.every((d1, i) => d1 === value2[i])) ||
  value1 === value2;
