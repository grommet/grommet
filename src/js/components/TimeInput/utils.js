// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  getSectionKeyFromType,
  getSectionNameFromType,
} from '../../utils/sectionHelpers';
import { pad } from '../../utils/dates';

export const SECTION_HOUR = 0;
export const SECTION_MINUTE = 1;
export const SECTION_SECOND = 2;
export const SECTION_PERIOD = 3;

export { pad };

export const sectionTypeFromSection = (section) => {
  if (section === SECTION_HOUR) return 'hours';
  if (section === SECTION_MINUTE) return 'minutes';
  if (section === SECTION_SECOND) return 'seconds';
  return 'meridiem';
};

export const getSectionName = (section, format, formatMessage, messages) => {
  const sectionType = sectionTypeFromSection(section);
  const sectionName = getSectionNameFromType({
    sectionType,
    messagePrefix: 'timeInput',
    formatMessage,
    messages,
  });

  if (format !== '12' && sectionType === 'meridiem') return undefined;
  return sectionName;
};

// TimeInput always transacts (value/defaultValue/onChange) in a canonical
// 24-hour ISO time string ("HH:MM:SS"), regardless of the display `format`
// prop. Input may also be passed as "HH:MM" (without seconds); it's
// normalized to "HH:MM:00" so the rest of the component only ever deals
// with one shape.
export const ISO_TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
export const ISO_TIME_NO_SECONDS_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const normalizeToIsoTime = (value) => {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  const trimmed = value.trim();
  if (ISO_TIME_REGEX.test(trimmed)) return trimmed;
  if (ISO_TIME_NO_SECONDS_REGEX.test(trimmed)) return `${trimmed}:00`;

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

export const defaultHourForFormat = (format) => (format === '12' ? 12 : 0);

export const sectionKey = (section) => {
  const sectionType = sectionTypeFromSection(section);
  return getSectionKeyFromType(sectionType);
};

export const getSectionAriaMeta = ({ section, format, sections }) => {
  if (section === SECTION_PERIOD) {
    let now;
    if (sections.period !== undefined) now = sections.period === 'PM' ? 1 : 0;
    return { now, min: 0, max: 1 };
  }

  const key = sectionKey(section);
  const min = sectionMin(section, format);
  const max = sectionMax(section, format);
  // Omit aria-valuenow entirely when the section has no value yet, rather
  // than defaulting to a real number (e.g. 0) that would misrepresent an
  // empty segment as having an actual value (WCAG 4.1.2).
  const now = sections[key];

  return { now, min, max };
};
