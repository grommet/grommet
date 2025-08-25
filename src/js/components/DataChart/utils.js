import { round } from '../Chart';

export const points = [
  'circle',
  'diamond',
  'square',
  'star',
  'triangle',
  'triangleDown',
];

export const heightYGranularity = {
  xxsmall: { fine: 2, medium: 2 },
  xsmall: { fine: 3, medium: 2 },
  small: { fine: 5, medium: 3 },
  medium: { fine: 7, medium: 5 },
  large: { fine: 9, medium: 5 },
  xlarge: { fine: 11, medium: 5 },
};

export const halfPad = (theme) => ({
  xlarge: theme.dataChart?.halfPad?.xlarge || 'large',
  large: theme.dataChart?.halfPad?.large || 'medium',
  medium: theme.dataChart?.halfPad?.medium || 'small',
  small: theme.dataChart?.halfPad?.small || 'xsmall',
  xsmall: theme.dataChart?.halfPad?.xsmall || 'xxsmall',
});

export const doublePad = (theme) => ({
  large: theme.dataChart?.doublePad?.large || 'xlarge',
  medium: theme.dataChart?.doublePad?.medium || 'large',
  small: theme.dataChart?.doublePad?.small || 'medium',
  xsmall: theme.dataChart?.doublePad?.xsmall || 'small',
  xxsmall: theme.dataChart?.doublePad?.xxsmall || 'xsmall',
});

const getOrderedSizes = (theme) =>
  theme?.dataChart?.orderedSizes || [
    'xlarge',
    'large',
    'medium',
    'small',
    'xsmall',
    'xxsmall',
    'hair',
  ];

export const showInUnits = (content, maxValue) => {
  let divideBy;
  let unit;
  let newContent = content;
  if (maxValue > 10000000) {
    divideBy = 1000000;
    unit = 'M';
  } else if (maxValue > 10000) {
    divideBy = 1000;
    unit = 'K';
  }
  if (divideBy) newContent = round(newContent / divideBy, 0);
  if (unit) newContent = `${newContent}${unit}`;
  return newContent;
};

export const largestSize = (theme, size1, size2) => {
  const orderedSizes = getOrderedSizes(theme);
  if (size1 && !size2) return size1;
  if (size2 && !size1) return size2;
  if (orderedSizes.indexOf(size1) < orderedSizes.indexOf(size2)) return size1;
  return size2;
};

export const createDateFormat = (firstValue, lastValue, full) => {
  let dateFormat;
  const startDate = new Date(firstValue);
  const endDate = new Date(lastValue);
  if (
    // check for valid dates, this is the fastest way
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime())
  ) {
    const delta = Math.abs(endDate - startDate);
    let options;
    if (delta < 60000)
      // less than 1 minute
      options = full
        ? {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: undefined,
          }
        : { second: '2-digit', day: undefined };
    else if (delta < 3600000)
      // less than 1 hour
      options = full
        ? { hour: 'numeric', minute: '2-digit', day: undefined }
        : { minute: '2-digit', day: undefined };
    else if (delta < 86400000)
      // less than 1 day
      options = { hour: 'numeric' };
    else if (delta < 2592000000)
      // less than 30 days
      options = {
        month: full ? 'short' : 'numeric',
        day: 'numeric',
      };
    else if (delta < 31557600000)
      // less than 1 year
      options = { month: full ? 'long' : 'short' };
    // 1 year or more
    else options = { year: 'numeric' };
    if (options)
      dateFormat = new Intl.DateTimeFormat(undefined, options).format;
  }
  return dateFormat;
};

export const minimum = (value1, value2) =>
  value1 !== undefined ? Math.min(value1, value2) : value2;

export const maximum = (value1, value2) =>
  value1 !== undefined ? Math.max(value1, value2) : value2;
