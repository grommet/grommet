export var SECTION_HOUR = 0;
export var SECTION_MINUTE = 1;
export var SECTION_SECOND = 2;
export var SECTION_PERIOD = 3;
export var pad = function pad(value) {
  return value.toString().padStart(2, '0');
};
var sectionMessageId = function sectionMessageId(section) {
  if (section === SECTION_HOUR) return 'timeInput.sectionHours';
  if (section === SECTION_MINUTE) return 'timeInput.sectionMinutes';
  if (section === SECTION_SECOND) return 'timeInput.sectionSeconds';
  return 'timeInput.sectionMeridiem';
};
export var getSectionName = function getSectionName(section, format, formatMessage, messages) {
  if (formatMessage) {
    return formatMessage({
      id: sectionMessageId(section),
      messages: messages
    });
  }
  var names = format === '12' ? ['hours', 'minutes', 'seconds', 'meridiem'] : ['hours', 'minutes', 'seconds'];
  return names[section];
};
export var getRanges = function getRanges(format) {
  if (format === '12') {
    return [[0, 2], [3, 5], [6, 8], [9, 11]];
  }
  return [[0, 2], [3, 5], [6, 8]];
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
export var parseTime = function parseTime(value, format) {
  if (!value || typeof value !== 'string') return undefined;
  var trimmed = value.trim().toUpperCase();
  if (format === '12') {
    var _match = trimmed.match(/^(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/);
    if (!_match) return undefined;
    var _hour = Number(_match[1]);
    var _minute = Number(_match[2]);
    var _second = Number(_match[3]);
    var period = _match[4];
    if (Number.isNaN(_hour) || Number.isNaN(_minute) || Number.isNaN(_second) || _hour < 1 || _hour > 12 || _minute < 0 || _minute > 59 || _second < 0 || _second > 59) {
      return undefined;
    }
    return {
      hour: _hour,
      minute: _minute,
      second: _second,
      period: period
    };
  }
  var match = trimmed.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) return undefined;
  var hour = Number(match[1]);
  var minute = Number(match[2]);
  var second = Number(match[3]);
  if (Number.isNaN(hour) || Number.isNaN(minute) || Number.isNaN(second) || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
    return undefined;
  }
  return {
    hour: hour,
    minute: minute,
    second: second
  };
};
export var formatTime = function formatTime(time, format) {
  if (!time) return undefined;
  if (format === '12') {
    return pad(time.hour) + ":" + pad(time.minute) + ":" + pad(time.second) + " " + (time.period || 'AM');
  }
  return pad(time.hour) + ":" + pad(time.minute) + ":" + pad(time.second);
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
export var sectionKey = function sectionKey(section) {
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
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
  var now = (_sections$key = sections[key]) != null ? _sections$key : min;
  return {
    now: now,
    min: min,
    max: max
  };
};
export var getActiveSectionAriaMeta = function getActiveSectionAriaMeta(_ref2) {
  var activeSection = _ref2.activeSection,
    format = _ref2.format,
    sections = _ref2.sections;
  return getSectionAriaMeta({
    section: activeSection,
    format: format,
    sections: sections
  });
};