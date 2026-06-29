const getMinuteOptions = (step) => {
  if (!step || !Number.isInteger(step) || step <= 0 || step > 30)
    return undefined;
  return Array.from({ length: Math.ceil(60 / step) }, (_, index) =>
    `${index * step}`.padStart(2, '0'),
  ).filter((value) => Number(value) < 60);
};

const getSecondOptions = (step) => {
  if (!step || !Number.isInteger(step) || step <= 0 || step > 30)
    return undefined;
  return Array.from({ length: Math.ceil(60 / step) }, (_, index) =>
    `${index * step}`.padStart(2, '0'),
  ).filter((value) => Number(value) < 60);
};

const normalizeHour = (hour, period, timeFormat) => {
  if (timeFormat === '24hr') {
    if (hour < 0 || hour > 23) return undefined;
    return hour;
  }

  if (hour < 1 || hour > 12 || !period) return undefined;
  if (period.toLowerCase() === 'am') return hour % 12;
  return (hour % 12) + 12;
};

const toSeconds = (time) =>
  time.hour * 60 * 60 +
  time.minute * 60 +
  (typeof time.second === 'number' ? time.second : 0);

export const getDefaultTimeFormat = () => {
  const formatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric' });
  return formatter.resolvedOptions().hour12 ? '12hr' : '24hr';
};

export const buildTimeMask = ({
  timeFormat,
  minuteStep,
  secondStep,
  showSeconds,
}) => {
  const minuteOptions = getMinuteOptions(minuteStep);
  const secondOptions = getSecondOptions(secondStep);

  const minuteItem = {
    length: 2,
    options: minuteOptions,
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: 'mm',
  };

  const secondItem = {
    length: 2,
    options: secondOptions,
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: 'ss',
  };

  if (timeFormat === '24hr') {
    const mask = [
      {
        length: [1, 2],
        regexp: /^[0-2]?[0-9]$/,
        placeholder: 'hh',
      },
      { fixed: ':' },
      minuteItem,
    ];

    if (showSeconds) {
      mask.push({ fixed: ':' });
      mask.push(secondItem);
    }

    return mask;
  }

  const mask = [
    {
      length: [1, 2],
      regexp: /^1[0-2]$|^[1-9]$/,
      placeholder: 'hh',
    },
    { fixed: ':' },
    minuteItem,
  ];

  if (showSeconds) {
    mask.push({ fixed: ':' });
    mask.push(secondItem);
  }

  mask.push({ fixed: ' ' });
  mask.push({
    length: 2,
    options: ['am', 'pm'],
    regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
    placeholder: 'am',
  });

  return mask;
};

export const parseTimeText = ({ value, timeFormat, showSeconds }) => {
  if (!value) return undefined;

  let match;
  if (timeFormat === '24hr') {
    match = showSeconds
      ? /^(\d{1,2}):(\d{2}):(\d{2})$/.exec(value.trim())
      : /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  } else {
    match = showSeconds
      ? /^(\d{1,2}):(\d{2}):(\d{2})\s*([aApP][mM])$/.exec(value.trim())
      : /^(\d{1,2}):(\d{2})\s*([aApP][mM])$/.exec(value.trim());
  }

  if (!match) return undefined;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = showSeconds ? Number(match[3]) : 0;
  const period = timeFormat === '12hr' ? match[showSeconds ? 4 : 3] : undefined;

  if (Number.isNaN(hour) || Number.isNaN(minute) || minute > 59)
    return undefined;
  if (showSeconds && (Number.isNaN(second) || second > 59)) return undefined;

  const normalizedHour = normalizeHour(hour, period, timeFormat);
  if (normalizedHour === undefined) return undefined;

  return { hour: normalizedHour, minute, second };
};

export const formatTimeText = ({ dateTime, timeFormat, showSeconds }) => {
  if (!dateTime) return '';

  const minuteText = `${dateTime.minute}`.padStart(2, '0');
  const secondText = `${dateTime.second || 0}`.padStart(2, '0');

  if (timeFormat === '24hr') {
    const hourText = `${dateTime.hour}`.padStart(2, '0');
    return showSeconds
      ? `${hourText}:${minuteText}:${secondText}`
      : `${hourText}:${minuteText}`;
  }

  const period = dateTime.hour >= 12 ? 'pm' : 'am';
  const hour12 = dateTime.hour % 12 || 12;
  const hourText = `${hour12}`.padStart(2, '0');

  return showSeconds
    ? `${hourText}:${minuteText}:${secondText} ${period}`
    : `${hourText}:${minuteText} ${period}`;
};

export const isMinuteStepValid = (dateTime, minuteStep) => {
  if (!minuteStep) return true;
  if (!Number.isInteger(minuteStep) || minuteStep <= 0 || minuteStep > 60)
    return true;
  return dateTime.minute % minuteStep === 0;
};

export const isSecondStepValid = (dateTime, secondStep) => {
  if (!secondStep) return true;
  if (!Number.isInteger(secondStep) || secondStep <= 0 || secondStep > 60)
    return true;
  return (dateTime.second || 0) % secondStep === 0;
};

export const isWithinBounds = ({
  value,
  min,
  max,
  timeFormat,
  showSeconds,
}) => {
  if (!value) return true;

  const parsed = parseTimeText({ value, timeFormat, showSeconds });
  if (!parsed) return false;

  const current = toSeconds(parsed);

  if (min) {
    const minParsed = parseTimeText({ value: min, timeFormat, showSeconds });
    if (minParsed && current < toSeconds(minParsed)) return false;
  }

  if (max) {
    const maxParsed = parseTimeText({ value: max, timeFormat, showSeconds });
    if (maxParsed && current > toSeconds(maxParsed)) return false;
  }

  return true;
};

export const normalizeTimeText = ({ value, timeFormat, showSeconds }) => {
  const parsed = parseTimeText({ value, timeFormat, showSeconds });
  if (!parsed) return '';
  return formatTimeText({ dateTime: parsed, timeFormat, showSeconds });
};
