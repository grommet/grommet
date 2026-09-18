// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { getSectionKeyFromType, getSectionNameFromType } from '../../utils/sectionHelpers';
import { pad } from '../../utils/dates';
export var SECTION_HOUR = 0;
export var SECTION_MINUTE = 1;
export var SECTION_SECOND = 2;
export var SECTION_PERIOD = 3;
export { pad };
export var sectionTypeFromSection = function sectionTypeFromSection(section) {
  if (section === SECTION_HOUR) return 'hours';
  if (section === SECTION_MINUTE) return 'minutes';
  if (section === SECTION_SECOND) return 'seconds';
  return 'meridiem';
};
export var getSectionName = function getSectionName(section, format, formatMessage, messages) {
  var sectionType = sectionTypeFromSection(section);
  var sectionName = getSectionNameFromType({
    sectionType: sectionType,
    messagePrefix: 'timeInput',
    formatMessage: formatMessage,
    messages: messages
  });
  if (format !== '12' && sectionType === 'meridiem') return undefined;
  return sectionName;
};

// TimeInput always transacts (value/defaultValue/onChange) in a canonical
// 24-hour ISO time string ("HH:MM:SS"), regardless of the display `format`
// prop.
export var ISO_TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
export var normalizeToIsoTime = function normalizeToIsoTime(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  var trimmed = value.trim();
  if (ISO_TIME_REGEX.test(trimmed)) return trimmed;
  var parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return pad(parsed.getHours()) + ":" + pad(parsed.getMinutes()) + ":" + pad(parsed.getSeconds());
};

// Converts a canonical 24-hour ISO time string into the section shape the
// sectioned editor uses for display, deriving 12-hour + period fields when
// needed.
export var isoTimeToSections = function isoTimeToSections(isoTime, format) {
  if (typeof isoTime !== 'string') return undefined;
  var match = isoTime.match(ISO_TIME_REGEX);
  if (!match) return undefined;
  var hour24 = Number(match[1]);
  var minute = Number(match[2]);
  var second = Number(match[3]);
  if (format === '12') {
    var period = hour24 < 12 ? 'AM' : 'PM';
    var hour = hour24 % 12 || 12;
    return {
      hour: hour,
      minute: minute,
      second: second,
      period: period
    };
  }
  return {
    hour: hour24,
    minute: minute,
    second: second
  };
};
export var sectionsToIsoTime = function sectionsToIsoTime(sections, format) {
  if (sections.hour === undefined || sections.minute === undefined || sections.second === undefined) {
    return undefined;
  }
  var hour24 = sections.hour;
  if (format === '12') {
    var period = sections.period || 'AM';
    hour24 = sections.hour % 12;
    if (period === 'PM') hour24 += 12;
  }
  return pad(hour24) + ":" + pad(sections.minute) + ":" + pad(sections.second);
};
export var defaultSections = function defaultSections(format) {
  return format === '12' ? {
    hour: undefined,
    minute: undefined,
    second: undefined,
    period: undefined
  } : {
    hour: undefined,
    minute: undefined,
    second: undefined
  };
};
export var hasAnyValue = function hasAnyValue(sections) {
  return sections.hour !== undefined || sections.minute !== undefined || sections.second !== undefined || sections.period !== undefined;
};
export var sectionMax = function sectionMax(section, format) {
  if (section === SECTION_HOUR) return format === '12' ? 12 : 23;
  return 59;
};
export var sectionMin = function sectionMin(section, format) {
  if (section === SECTION_HOUR) return format === '12' ? 1 : 0;
  return 0;
};
export var defaultHourForFormat = function defaultHourForFormat(format) {
  return format === '12' ? 12 : 0;
};
export var sectionKey = function sectionKey(section) {
  var sectionType = sectionTypeFromSection(section);
  return getSectionKeyFromType(sectionType);
};
export var getSectionAriaMeta = function getSectionAriaMeta(_ref) {
  var _sections$key;
  var section = _ref.section,
    format = _ref.format,
    sections = _ref.sections;
  if (section === SECTION_PERIOD) {
    return {
      now: sections.period === 'PM' ? 1 : 0,
      min: 0,
      max: 1
    };
  }
  var key = sectionKey(section);
  var min = sectionMin(section, format);
  var max = sectionMax(section, format);
  var now = (_sections$key = sections[key]) != null ? _sections$key : section === SECTION_HOUR ? defaultHourForFormat(format) : min;
  return {
    now: now,
    min: min,
    max: max
  };
};