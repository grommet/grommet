export const SECTION_HOUR = 0;
export const SECTION_MINUTE = 1;
export const SECTION_SECOND = 2;
export const SECTION_PERIOD = 3;

export const pad = (value) => value.toString().padStart(2, '0');

const sectionMessageId = (section) => {
  if (section === SECTION_HOUR) return 'timeInput.sectionHours';
  if (section === SECTION_MINUTE) return 'timeInput.sectionMinutes';
  if (section === SECTION_SECOND) return 'timeInput.sectionSeconds';
  return 'timeInput.sectionMeridiem';
};

export const getSectionName = (section, format, formatMessage, messages) => {
  if (formatMessage) {
    return formatMessage({ id: sectionMessageId(section), messages });
  }

  const names =
    format === '12'
      ? ['hours', 'minutes', 'seconds', 'meridiem']
      : ['hours', 'minutes', 'seconds'];
  return names[section];
};

export const getRanges = (format) => {
  if (format === '12') {
    return [
      [0, 2],
      [3, 5],
      [6, 8],
      [9, 11],
    ];
  }
  return [
    [0, 2],
    [3, 5],
    [6, 8],
  ];
};

// TimeInput always transacts (value/defaultValue/onChange) in a canonical
// 24-hour ISO time string ("HH:MM:SS"), regardless of the display `format`
// prop.
export const ISO_TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

export const normalizeToIsoTime = (value) => {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  const trimmed = value.trim();
  if (ISO_TIME_REGEX.test(trimmed)) return trimmed;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return undefined;

  return `${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(
    parsed.getSeconds(),
  )}`;
};

// Converts a canonical 24-hour ISO time string into the section shape the
// sectioned editor uses for display, deriving 12-hour + period fields when
// needed.
export const isoTimeToSections = (isoTime, format) => {
  if (typeof isoTime !== 'string') return undefined;
  const match = isoTime.match(ISO_TIME_REGEX);
  if (!match) return undefined;

  const hour24 = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3]);

  if (format === '12') {
    const period = hour24 < 12 ? 'AM' : 'PM';
    const hour = hour24 % 12 || 12;
    return { hour, minute, second, period };
  }

  return { hour: hour24, minute, second };
};

export const sectionsToIsoTime = (sections, format) => {
  if (
    sections.hour === undefined ||
    sections.minute === undefined ||
    sections.second === undefined
  ) {
    return undefined;
  }

  let hour24 = sections.hour;
  if (format === '12') {
    const period = sections.period || 'AM';
    hour24 = sections.hour % 12;
    if (period === 'PM') hour24 += 12;
  }

  return `${pad(hour24)}:${pad(sections.minute)}:${pad(sections.second)}`;
};

export const parseTime = (value, format) => {
  if (!value || typeof value !== 'string') return undefined;
  const trimmed = value.trim().toUpperCase();

  if (format === '12') {
    const match = trimmed.match(/^(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/);
    if (!match) return undefined;

    const hour = Number(match[1]);
    const minute = Number(match[2]);
    const second = Number(match[3]);
    const period = match[4];

    if (
      Number.isNaN(hour) ||
      Number.isNaN(minute) ||
      Number.isNaN(second) ||
      hour < 1 ||
      hour > 12 ||
      minute < 0 ||
      minute > 59 ||
      second < 0 ||
      second > 59
    ) {
      return undefined;
    }

    return { hour, minute, second, period };
  }

  const match = trimmed.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) return undefined;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = Number(match[3]);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute) ||
    Number.isNaN(second) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return undefined;
  }

  return { hour, minute, second };
};

export const formatTime = (time, format) => {
  if (!time) return undefined;
  if (format === '12') {
    return `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)} ${
      time.period || 'AM'
    }`;
  }
  return `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`;
};

export const defaultSections = (format) =>
  format === '12'
    ? {
        hour: undefined,
        minute: undefined,
        second: undefined,
        period: undefined,
      }
    : {
        hour: undefined,
        minute: undefined,
        second: undefined,
      };

export const hasAnyValue = (sections) =>
  sections.hour !== undefined ||
  sections.minute !== undefined ||
  sections.second !== undefined ||
  sections.period !== undefined;

export const sectionMax = (section, format) => {
  if (section === SECTION_HOUR) return format === '12' ? 12 : 23;
  return 59;
};

export const sectionMin = (section, format) => {
  if (section === SECTION_HOUR) return format === '12' ? 1 : 0;
  return 0;
};

export const sectionKey = (section) => {
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
};

export const getSectionAriaMeta = ({ section, format, sections }) => {
  if (section === SECTION_PERIOD) {
    return {
      now: sections.period === 'PM' ? 1 : 0,
      min: 0,
      max: 1,
    };
  }

  const key = sectionKey(section);
  const min = sectionMin(section, format);
  const max = sectionMax(section, format);
  const now = sections[key] ?? min;

  return { now, min, max };
};

export const getActiveSectionAriaMeta = ({ activeSection, format, sections }) =>
  getSectionAriaMeta({ section: activeSection, format, sections });
