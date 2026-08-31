"use strict";

exports.__esModule = true;
exports.DateTimeInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Calendar = require("grommet-icons/icons/Calendar");
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _MessageContext = require("../../contexts/MessageContext");
var _dates = require("../../utils/dates");
var _utils = require("../../utils");
var _useSectionedField2 = require("../../utils/useSectionedField");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _ThemeContext = require("../../contexts/ThemeContext");
var _Box = require("../Box");
var _Button = require("../Button");
var _Calendar2 = require("../Calendar");
var _Drop = require("../Drop");
var _Form = require("../Form");
var _Keyboard = require("../Keyboard");
var _TimeInput = require("../TimeInput");
var _utils2 = require("../TimeInput/utils");
var _sectionHelpers = require("../../utils/sectionHelpers");
var _StyledDateTimeInput = require("./StyledDateTimeInput");
var _propTypes = require("./propTypes");
var _excluded = ["defaultValue", "disabled", "format", "id", "inline", "locale", "messages", "minuteStep", "name", "onChange", "plain", "focusIndicator", "readOnly", "showSeconds", "value"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var SECTION_DAY = 0;
var SECTION_MONTH = 1;
var SECTION_YEAR = 2;
var SECTION_HOUR = 3;
var SECTION_MINUTE = 4;
var SECTION_SECOND = 5;
var SECTION_PERIOD = 6;
var pad4 = function pad4(value) {
  return String(value).padStart(4, '0');
};
var getDaysInMonth = function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
};
var sectionTypeFromSection = function sectionTypeFromSection(section) {
  if (section === SECTION_DAY) return 'day';
  if (section === SECTION_MONTH) return 'month';
  if (section === SECTION_YEAR) return 'year';
  if (section === SECTION_HOUR) return 'hours';
  if (section === SECTION_MINUTE) return 'minutes';
  if (section === SECTION_SECOND) return 'seconds';
  return 'meridiem';
};
var defaultSections = function defaultSections(format, showSeconds) {
  var base = _extends({
    day: undefined,
    month: undefined,
    year: undefined,
    hour: undefined,
    minute: undefined
  }, showSeconds ? {
    second: undefined
  } : {});
  if (format === '12') {
    return _extends({}, base, {
      period: undefined
    });
  }
  return base;
};
var hasAnyValue = function hasAnyValue(sections) {
  return sections.day !== undefined || sections.month !== undefined || sections.year !== undefined || sections.hour !== undefined || sections.minute !== undefined || sections.second !== undefined || sections.period !== undefined;
};
var sectionForPart = function sectionForPart(partType) {
  if (partType === 'day') return SECTION_DAY;
  if (partType === 'month') return SECTION_MONTH;
  if (partType === 'year') return SECTION_YEAR;
  if (partType === 'hour') return SECTION_HOUR;
  if (partType === 'minute') return SECTION_MINUTE;
  if (partType === 'second') return SECTION_SECOND;
  if (partType === 'dayPeriod') return SECTION_PERIOD;
  return undefined;
};
var getSectionOrder = function getSectionOrder(format, showSeconds) {
  var timeSections = showSeconds ? [SECTION_HOUR, SECTION_MINUTE, SECTION_SECOND] : [SECTION_HOUR, SECTION_MINUTE];
  if (format === '12') {
    return [SECTION_DAY, SECTION_MONTH, SECTION_YEAR].concat(timeSections, [SECTION_PERIOD]);
  }
  return [SECTION_DAY, SECTION_MONTH, SECTION_YEAR].concat(timeSections);
};
var separatorBeforeSection = function separatorBeforeSection(section) {
  if (section === SECTION_MONTH || section === SECTION_YEAR) return '/';
  if (section === SECTION_HOUR) return ' ';
  if (section === SECTION_MINUTE || section === SECTION_SECOND) return ':';
  return ' ';
};
var getLocaleSectionLayout = function getLocaleSectionLayout(format, showSeconds, locale) {
  var fallbackOrder = getSectionOrder(format, showSeconds);
  var fallbackPrefixes = {};
  fallbackOrder.forEach(function (section, index) {
    fallbackPrefixes[section] = index === 0 ? '' : separatorBeforeSection(section);
  });
  try {
    var formatter = new Intl.DateTimeFormat(locale || undefined, _extends({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }, showSeconds ? {
      second: '2-digit'
    } : {}, {
      hour12: format === '12'
    }));
    var parts = formatter.formatToParts(new Date());
    var seen = new Set();
    var sectionOrder = [];
    var separatorMap = {};
    var pendingLiteral = '';
    parts.forEach(function (part) {
      if (part.type === 'literal') {
        pendingLiteral += part.value;
        return;
      }
      var section = sectionForPart(part.type);
      if (section === undefined) return;
      if (section === SECTION_PERIOD && format !== '12') return;
      if (section === SECTION_SECOND && !showSeconds) return;
      if (!seen.has(section)) {
        // Normalize the date/time boundary separator: strip commas (e.g. ", "
        // from en-US) so the display matches the design spec (space only).
        var raw = sectionOrder.length === 0 ? '' : pendingLiteral;
        separatorMap[section] = section === SECTION_HOUR ? raw.replace(/,/g, '').trimStart() || ' ' : raw;
        sectionOrder.push(section);
        seen.add(section);
      }
      pendingLiteral = '';
    });
    fallbackOrder.forEach(function (section) {
      if (!seen.has(section)) {
        separatorMap[section] = sectionOrder.length === 0 ? '' : separatorBeforeSection(section);
        sectionOrder.push(section);
      }
    });
    return {
      sectionOrder: sectionOrder,
      separatorMap: separatorMap
    };
  } catch (_unused) {
    return {
      sectionOrder: fallbackOrder,
      separatorMap: fallbackPrefixes
    };
  }
};
var getLocaleTimeFormat = function getLocaleTimeFormat(locale) {
  try {
    var _Intl$DateTimeFormat$ = new Intl.DateTimeFormat(locale || undefined, {
        hour: 'numeric'
      }).resolvedOptions(),
      hour12 = _Intl$DateTimeFormat$.hour12;
    return hour12 === false ? '24' : '12';
  } catch (_unused2) {
    return '12';
  }
};
var toLocalSections = function toLocalSections(value, format) {
  if (!value || typeof value !== 'string') return undefined;
  var parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  var year = parsed.getFullYear();
  var month = parsed.getMonth() + 1;
  var day = parsed.getDate();
  var hour24 = parsed.getHours();
  var minute = parsed.getMinutes();
  var second = parsed.getSeconds();
  if (format === '12') {
    var period = hour24 < 12 ? 'AM' : 'PM';
    var hour = hour24 % 12 || 12;
    return {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second,
      period: period
    };
  }
  return {
    day: day,
    month: month,
    year: year,
    hour: hour24,
    minute: minute,
    second: second
  };
};
var toUtcISOString = function toUtcISOString(sections, format, showSeconds) {
  var day = sections.day,
    month = sections.month,
    year = sections.year,
    hour = sections.hour,
    minute = sections.minute,
    second = sections.second,
    _sections$period = sections.period,
    period = _sections$period === void 0 ? 'AM' : _sections$period;
  if (day === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined || showSeconds && second === undefined) {
    return undefined;
  }
  var hour24 = hour;
  if (format === '12') {
    hour24 = hour % 12;
    if (period === 'PM') hour24 += 12;
  }
  var daysInMonth = getDaysInMonth(year, month);
  if (day < 1 || day > daysInMonth) return undefined;
  var resolvedSecond = showSeconds ? second : second != null ? second : 0;
  var candidate = new Date(year, month - 1, day, hour24, minute, resolvedSecond, 0);
  if (candidate.getFullYear() !== year || candidate.getMonth() + 1 !== month || candidate.getDate() !== day) {
    return undefined;
  }
  return candidate.toISOString();
};
var getCalendarDate = function getCalendarDate(sections) {
  var day = sections.day,
    month = sections.month,
    year = sections.year;
  if (day === undefined || month === undefined || year === undefined) {
    return undefined;
  }
  var daysInMonth = getDaysInMonth(year, month);
  if (day < 1 || day > daysInMonth) return undefined;

  // Calendar selection should persist even before time sections are complete.
  return pad4(year) + "-" + (0, _dates.pad)(month) + "-" + (0, _dates.pad)(day);
};
var parseCalendarSelection = function parseCalendarSelection(nextValue) {
  if (!nextValue) return undefined;
  var nextDate = Array.isArray(nextValue) ? nextValue[0] : nextValue;
  if (!nextDate || typeof nextDate !== 'string') return undefined;
  var match = /^(\d{4})-(\d{2})-(\d{2})/.exec(nextDate);
  if (match) {
    return {
      year: Number(match[1]),
      month: Number(match[2]),
      day: Number(match[3])
    };
  }
  var parsed = new Date(nextDate);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return {
    year: parsed.getFullYear(),
    month: parsed.getMonth() + 1,
    day: parsed.getDate()
  };
};
var getSeededTimeSections = function getSeededTimeSections(sections, format, showSeconds) {
  var _sections$hour, _sections$minute, _sections$second, _sections$period2;
  var hourMin = (0, _utils2.defaultHourForFormat)(format);
  return _extends({
    hour: (_sections$hour = sections.hour) != null ? _sections$hour : hourMin,
    minute: (_sections$minute = sections.minute) != null ? _sections$minute : 0
  }, showSeconds ? {
    second: (_sections$second = sections.second) != null ? _sections$second : 0
  } : {}, format === '12' ? {
    period: (_sections$period2 = sections.period) != null ? _sections$period2 : 'AM'
  } : {});
};
var hasCompleteDateSections = function hasCompleteDateSections(sections) {
  return sections.day !== undefined && sections.month !== undefined && sections.year !== undefined;
};
var getSeededDateSections = function getSeededDateSections(sections) {
  if (hasCompleteDateSections(sections)) {
    return {
      day: sections.day,
      month: sections.month,
      year: sections.year
    };
  }
  var today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  };
};
var getSectionName = function getSectionName(section, formatMessage, messages) {
  var sectionType = sectionTypeFromSection(section);
  return (0, _sectionHelpers.getSectionNameFromType)({
    sectionType: sectionType,
    messagePrefix: 'dateTimeInput',
    formatMessage: formatMessage,
    messages: messages
  });
};
var getSectionLimits = function getSectionLimits(section, format, sections) {
  if (section === SECTION_DAY) {
    var year = sections.year || new Date().getFullYear();
    var month = sections.month || 1;
    return {
      min: 1,
      max: getDaysInMonth(year, month)
    };
  }
  if (section === SECTION_MONTH) return {
    min: 1,
    max: 12
  };
  if (section === SECTION_YEAR) return {
    min: 1,
    max: 9999
  };
  if (section === SECTION_HOUR) return {
    min: format === '12' ? 1 : 0,
    max: format === '12' ? 12 : 23
  };
  if (section === SECTION_PERIOD) return {
    min: 0,
    max: 1
  };
  return {
    min: 0,
    max: 59
  };
};
var digitsPerSection = function digitsPerSection(section) {
  if (section === SECTION_YEAR) return 4;
  if (section === SECTION_PERIOD) return 0;
  return 2;
};
var formatSectionText = function formatSectionText(section, value) {
  if (value === undefined || value === '') return (0, _sectionHelpers.getSectionTokenFromType)(sectionTypeFromSection(section));
  if (section === SECTION_YEAR) return pad4(value);
  if (section === SECTION_PERIOD) return value;
  return (0, _dates.pad)(value);
};
var DateTimeInput = exports.DateTimeInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, refArg) {
  var _theme$dateTimeInput, _theme$global$edgeSiz, _theme$global$edgeSiz2, _theme$dateTimeInput2, _theme$dateTimeInput3, _theme$dateTimeInput4, _theme$dateTimeInput5, _theme$calendar, _theme$dateTimeInput6, _theme$dateTimeInput7, _theme$dateTimeInput8, _theme$dateTimeInput9;
  var defaultValue = _ref.defaultValue,
    disabled = _ref.disabled,
    format = _ref.format,
    id = _ref.id,
    _ref$inline = _ref.inline,
    inline = _ref$inline === void 0 ? false : _ref$inline,
    locale = _ref.locale,
    messages = _ref.messages,
    _ref$minuteStep = _ref.minuteStep,
    minuteStep = _ref$minuteStep === void 0 ? 1 : _ref$minuteStep,
    name = _ref.name,
    onChange = _ref.onChange,
    plainProp = _ref.plain,
    focusIndicatorProp = _ref.focusIndicator,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$showSeconds = _ref.showSeconds,
    showSeconds = _ref$showSeconds === void 0 ? false : _ref$showSeconds,
    valueArg = _ref.value,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    formatMessage = _useContext.format;
  var formContext = (0, _react.useContext)(_Form.FormContext);
  var useFormInput = formContext.useFormInput;
  var resolvedFormat = (0, _react.useMemo)(function () {
    return format || getLocaleTimeFormat(locale);
  }, [format, locale]);
  var separatorPadToken = (_theme$dateTimeInput = theme.dateTimeInput) == null || (_theme$dateTimeInput = _theme$dateTimeInput.separator) == null ? void 0 : _theme$dateTimeInput.pad;
  var dateTimeSeparatorPadding = ((_theme$global$edgeSiz = theme.global.edgeSize) == null ? void 0 : _theme$global$edgeSiz[separatorPadToken]) || separatorPadToken || ((_theme$global$edgeSiz2 = theme.global.edgeSize) == null ? void 0 : _theme$global$edgeSiz2.xxsmall);
  var inputRef = (0, _utils.useForwardedRef)(refArg);
  var containerRef = (0, _react.useRef)();
  var triggerRef = (0, _react.useRef)();
  var segmentRefs = (0, _react.useRef)({});
  var activeSectionRef = (0, _react.useRef)(SECTION_DAY);
  var suppressSegmentFocusRef = (0, _react.useRef)(false);
  var suppressTimePartialSyncRef = (0, _react.useRef)(false);
  var editStateRef = (0, _react.useRef)({
    section: SECTION_DAY,
    buffer: ''
  });
  var _useFormInput = useFormInput({
      name: name,
      value: valueArg,
      initialValue: defaultValue || ''
    }),
    value = _useFormInput[0],
    setValue = _useFormInput[1];
  (0, _react.useEffect)(function () {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Warning: DateTimeInput is currently in beta. The API is subject ' + 'to change in future releases.');
    }
  }, []);
  var _useMemo = (0, _react.useMemo)(function () {
      return getLocaleSectionLayout(resolvedFormat, showSeconds, locale);
    }, [resolvedFormat, showSeconds, locale]),
    sectionOrder = _useMemo.sectionOrder,
    separatorMap = _useMemo.separatorMap;
  var firstSection = sectionOrder[0] || SECTION_DAY;
  var lastSection = sectionOrder[sectionOrder.length - 1] || SECTION_SECOND;
  var parseValue = (0, _react.useCallback)(function (nextValue) {
    return toLocalSections(nextValue, resolvedFormat);
  }, [resolvedFormat]);
  var getDefaultValue = (0, _react.useCallback)(function () {
    return defaultSections(resolvedFormat, showSeconds);
  }, [resolvedFormat, showSeconds]);
  var _useSectionedField = (0, _useSectionedField2.useSectionedField)({
      value: value,
      parseValue: parseValue,
      defaultValue: getDefaultValue,
      sectionOrder: sectionOrder
    }),
    activeSection = _useSectionedField.activeSection,
    pendingDigits = _useSectionedField.pendingDigits,
    preserveIncompleteSectionsRef = _useSectionedField.preserveIncompleteSectionsRef,
    sections = _useSectionedField.sections,
    setActiveSection = _useSectionedField.setActiveSection,
    setPendingDigits = _useSectionedField.setPendingDigits,
    setSections = _useSectionedField.setSections;
  var _useState = (0, _react.useState)(false),
    segmentFocused = _useState[0],
    setSegmentFocused = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    open = _useState2[0],
    setOpen = _useState2[1];
  var normalizedMinuteStep = (0, _react.useMemo)(function () {
    return (0, _dates.normalizeStep)(minuteStep);
  }, [minuteStep]);
  (0, _react.useEffect)(function () {
    activeSectionRef.current = activeSection;
  }, [activeSection]);
  var commitSections = (0, _react.useCallback)(function (nextSections) {
    setSections(nextSections);
    var complete = sectionOrder.every(function (section) {
      return nextSections[(0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section))] !== undefined;
    });
    var anyValue = hasAnyValue(nextSections);
    var nextValue = complete ? toUtcISOString(nextSections, resolvedFormat, showSeconds) : undefined;
    preserveIncompleteSectionsRef.current = (!nextValue || !complete) && anyValue;

    // Structured input contract: emit only valid committed values.
    // Emit undefined only when user fully clears the component.
    if (nextValue) {
      setValue(nextValue);
      onChange == null || onChange({
        value: nextValue
      });
      return;
    }
    if (!anyValue) {
      setValue(undefined);
      onChange == null || onChange({
        value: undefined
      });
    }
  }, [onChange, preserveIncompleteSectionsRef, resolvedFormat, sectionOrder, setSections, setValue, showSeconds]);
  var setSectionValue = (0, _react.useCallback)(function (section, rawValue) {
    var _extends2;
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
    var nextSections = _extends({}, sections, (_extends2 = {}, _extends2[key] = rawValue, _extends2));
    if (section === SECTION_MONTH || section === SECTION_YEAR) {
      var dayLimit = getSectionLimits(SECTION_DAY, resolvedFormat, nextSections).max;
      if (nextSections.day !== undefined && nextSections.day > dayLimit) {
        nextSections.day = dayLimit;
      }
    }
    commitSections(nextSections);
  }, [commitSections, resolvedFormat, sections]);
  var moveSection = (0, _react.useCallback)(function (direction) {
    var activeIndex = Math.max(0, sectionOrder.indexOf(activeSection));
    var count = sectionOrder.length;
    var nextIndex = (activeIndex + direction + count) % count;
    var nextSection = sectionOrder[nextIndex];
    setActiveSection(nextSection);
    return nextSection;
  }, [activeSection, sectionOrder, setActiveSection]);
  var focusSection = (0, _react.useCallback)(function (section) {
    var target = segmentRefs.current[section];
    if (target) target.focus();
  }, []);
  var incrementSection = (0, _react.useCallback)(function (section, delta) {
    if (section === SECTION_PERIOD) {
      setSectionValue(section, sections.period === 'AM' ? 'PM' : 'AM');
      return;
    }

    // When year is empty, seed it to the current year first to avoid
    // wrapping to 0001/9999 on the initial arrow interaction.
    if (section === SECTION_YEAR && sections.year === undefined) {
      setSectionValue(SECTION_YEAR, new Date().getFullYear());
      return;
    }
    var _getSectionLimits = getSectionLimits(section, resolvedFormat, sections),
      min = _getSectionLimits.min,
      max = _getSectionLimits.max;
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
    if (sections[key] === undefined) {
      setSectionValue(section, min);
      return;
    }
    var current = sections[key];
    var step = section === SECTION_MINUTE ? normalizedMinuteStep : 1;
    var next;
    if (section === SECTION_MINUTE && step > 1) {
      var options = Array.from({
        length: Math.ceil((max - min + 1) / step)
      }, function (_, index) {
        return min + index * step;
      }).filter(function (valueAtIndex) {
        return valueAtIndex <= max;
      });
      var currentIndex = options.indexOf(current);
      if (currentIndex !== -1) {
        var wrappedIndex = ((currentIndex + delta) % options.length + options.length) % options.length;
        next = options[wrappedIndex];
      } else if (delta > 0) {
        var _options$find;
        next = (_options$find = options.find(function (option) {
          return option > current;
        })) != null ? _options$find : options[0];
      } else {
        var _descending$find;
        var descending = [].concat(options).reverse();
        next = (_descending$find = descending.find(function (option) {
          return option < current;
        })) != null ? _descending$find : options[options.length - 1];
      }
    } else {
      next = current + delta * step;
      if (next > max) next = min;
      if (next < min) next = max;
    }
    setSectionValue(section, next);
  }, [normalizedMinuteStep, resolvedFormat, sections, setSectionValue]);
  var commitPendingBuffer = (0, _react.useCallback)(function () {
    var _editStateRef$current = editStateRef.current,
      section = _editStateRef$current.section,
      buffer = _editStateRef$current.buffer;
    if (!buffer) return;
    var numeric = Number(buffer);
    var _getSectionLimits2 = getSectionLimits(section, resolvedFormat, sections),
      min = _getSectionLimits2.min,
      max = _getSectionLimits2.max;
    if (!Number.isNaN(numeric) && numeric >= min && numeric <= max) {
      setSectionValue(section, numeric);
    }
    editStateRef.current = {
      section: section,
      buffer: ''
    };
    setPendingDigits({});
  }, [resolvedFormat, sections, setPendingDigits, setSectionValue]);
  var applyDigit = (0, _react.useCallback)(function (digit) {
    if (activeSection === SECTION_PERIOD) return activeSection;
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(activeSection));
    var needed = digitsPerSection(activeSection);
    var sameSection = editStateRef.current.section === activeSection;
    if (!sameSection) commitPendingBuffer();
    var currentBuffer = sameSection ? editStateRef.current.buffer : '';
    var nextBuffer = "" + currentBuffer + digit;
    editStateRef.current = {
      section: activeSection,
      buffer: nextBuffer
    };
    if (nextBuffer.length < needed) {
      var _getSectionLimits3 = getSectionLimits(activeSection, resolvedFormat, sections),
        _max = _getSectionLimits3.max;
      if (Number(nextBuffer) * 10 <= _max) {
        var _setPendingDigits;
        setPendingDigits((_setPendingDigits = {}, _setPendingDigits[key] = nextBuffer, _setPendingDigits));
        return activeSection;
      }
      // first digit * 10 exceeds max — commit it directly
    }
    var numeric = Number(nextBuffer);
    var _getSectionLimits4 = getSectionLimits(activeSection, resolvedFormat, sections),
      min = _getSectionLimits4.min,
      max = _getSectionLimits4.max;
    if (Number.isNaN(numeric) || numeric < min || numeric > max) {
      announce(formatMessage({
        id: 'dateTimeInput.invalidDateTime',
        messages: messages
      }), 'assertive');
      editStateRef.current = {
        section: activeSection,
        buffer: ''
      };
      setPendingDigits({});
      return activeSection;
    }
    setPendingDigits({});
    editStateRef.current = {
      section: activeSection,
      buffer: ''
    };
    setSectionValue(activeSection, numeric);
    var sectionIndex = sectionOrder.indexOf(activeSection);
    var isLastSection = sectionIndex === sectionOrder.length - 1;
    if (!isLastSection) return moveSection(1);
    return activeSection;
  }, [activeSection, announce, commitPendingBuffer, formatMessage, messages, moveSection, resolvedFormat, sectionOrder, sections, setPendingDigits, setSectionValue]);
  var clearActiveSection = (0, _react.useCallback)(function () {
    setPendingDigits({});
    editStateRef.current = {
      section: activeSection,
      buffer: ''
    };
    setSectionValue(activeSection, undefined);
  }, [activeSection, setPendingDigits, setSectionValue]);
  var getDisplayText = (0, _react.useCallback)(function (section) {
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
    var pending = pendingDigits[key];
    if (pending !== undefined) {
      if (section === SECTION_YEAR) return pending.padEnd(4, 'y');
      if (section === SECTION_PERIOD) return pending;
      return pending.padStart(2, '0');
    }
    return formatSectionText(section, sections[key]);
  }, [pendingDigits, sections]);
  var displaySections = (0, _react.useMemo)(function () {
    return sectionOrder.map(function (section, index) {
      var _separatorMap$section;
      var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
      return {
        section: section,
        prefix: index === 0 ? '' : (_separatorMap$section = separatorMap[section]) != null ? _separatorMap$section : separatorBeforeSection(section),
        text: getDisplayText(section),
        filled: sections[key] !== undefined || pendingDigits[key] !== undefined
      };
    });
  }, [getDisplayText, pendingDigits, sectionOrder, sections, separatorMap]);
  var placeholder = (0, _react.useMemo)(function () {
    return sectionOrder.map(function (section, index) {
      var _separatorMap$section2;
      var token = (0, _sectionHelpers.getSectionTokenFromType)(sectionTypeFromSection(section));
      if (index === 0) return token;
      var prefix = (_separatorMap$section2 = separatorMap[section]) != null ? _separatorMap$section2 : separatorBeforeSection(section);
      return "" + prefix + token;
    }).join('');
  }, [sectionOrder, separatorMap]);
  var hasDisplayValue = hasAnyValue(sections) || Object.keys(pendingDigits).length > 0;
  var inputValue = hasDisplayValue ? displaySections.map(function (_ref2) {
    var prefix = _ref2.prefix,
      text = _ref2.text;
    return "" + prefix + text;
  }).join('') : placeholder;
  var sectionValueAnnouncement = (0, _react.useCallback)(function (section) {
    var nameText = getSectionName(section, formatMessage, messages);
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
    var raw = sections[key];
    if (raw === undefined) {
      return formatMessage({
        id: 'dateTimeInput.activeSection',
        messages: messages,
        values: {
          section: nameText
        }
      });
    }
    return formatMessage({
      id: 'dateTimeInput.activeSectionValue',
      messages: messages,
      values: {
        value: raw
      }
    });
  }, [formatMessage, messages, sections]);
  var openPicker = (0, _react.useCallback)(function () {
    if (disabled || readOnly) return;
    if (!segmentFocused) {
      activeSectionRef.current = firstSection;
      setActiveSection(firstSection);
    }
    setOpen(true);
    announce(formatMessage({
      id: 'dateTimeInput.openDrop',
      messages: messages
    }));
  }, [announce, disabled, firstSection, formatMessage, messages, readOnly, segmentFocused, setActiveSection]);
  var closePicker = (0, _react.useCallback)(function () {
    setSegmentFocused(false);
    suppressSegmentFocusRef.current = true;
    setOpen(false);
    requestAnimationFrame(function () {
      focusSection(activeSectionRef.current);
    });
  }, [focusSection]);
  var onDisplaySectionMouseDown = (0, _react.useCallback)(function (section, event) {
    if (readOnly || disabled) return;
    if (event.button !== 0 || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();
    commitPendingBuffer();
    setSegmentFocused(true);
    setActiveSection(section);
    focusSection(section);
  }, [commitPendingBuffer, disabled, focusSection, readOnly, setActiveSection]);
  var onDisplayMouseDown = (0, _react.useCallback)(function (event) {
    var _sectionNode$dataset;
    if (readOnly || event.button !== 0 || event.defaultPrevented) return;
    var sectionNode = event.target.closest == null ? void 0 : event.target.closest('[data-section]');
    if ((sectionNode == null || (_sectionNode$dataset = sectionNode.dataset) == null ? void 0 : _sectionNode$dataset.section) !== undefined) {
      var section = Number(sectionNode.dataset.section);
      if (!Number.isNaN(section)) {
        onDisplaySectionMouseDown(section, event);
        return;
      }
    }
    event.preventDefault();
    commitPendingBuffer();
    setSegmentFocused(true);
    setActiveSection(firstSection);
    focusSection(firstSection);
  }, [commitPendingBuffer, firstSection, focusSection, onDisplaySectionMouseDown, readOnly, setActiveSection]);
  var onSegmentFocus = (0, _react.useCallback)(function (section) {
    if (suppressSegmentFocusRef.current) {
      suppressSegmentFocusRef.current = false;
    } else {
      setSegmentFocused(true);
    }
    if (readOnly || disabled) return;
    setActiveSection(section);
  }, [disabled, readOnly, setActiveSection]);
  var onSegmentBlur = (0, _react.useCallback)(function () {
    requestAnimationFrame(function () {
      var _document = document,
        activeElement = _document.activeElement;
      var isSegmentActive = Object.values(segmentRefs.current).includes(activeElement);
      if (!isSegmentActive && activeElement === document.body && !readOnly && !disabled) {
        focusSection(activeSection);
        return;
      }
      if (!isSegmentActive) {
        setSegmentFocused(false);
      }
    });
  }, [activeSection, disabled, focusSection, readOnly]);
  var onSegmentKeyDown = (0, _react.useCallback)(function (section, event) {
    if (readOnly || disabled) return;
    if (!segmentFocused) setSegmentFocused(true);
    var key = event.key;
    if (activeSection !== section) setActiveSection(section);
    if (key === 'ArrowRight') {
      event.preventDefault();
      commitPendingBuffer();
      var next = moveSection(1);
      focusSection(next);
      return;
    }
    if (key === 'ArrowLeft') {
      event.preventDefault();
      commitPendingBuffer();
      var _next = moveSection(-1);
      focusSection(_next);
      return;
    }
    if (key === 'Home') {
      event.preventDefault();
      commitPendingBuffer();
      setActiveSection(firstSection);
      focusSection(firstSection);
      return;
    }
    if (key === 'End') {
      event.preventDefault();
      commitPendingBuffer();
      setActiveSection(lastSection);
      focusSection(lastSection);
      return;
    }
    if (key === 'ArrowUp') {
      event.preventDefault();
      incrementSection(section, open ? -1 : 1);
      return;
    }
    if (key === 'ArrowDown') {
      if (event.altKey) {
        event.preventDefault();
        openPicker();
        return;
      }
      event.preventDefault();
      incrementSection(section, open ? 1 : -1);
      return;
    }
    if (key === 'Delete' || key === 'Backspace') {
      event.preventDefault();
      clearActiveSection();
      return;
    }
    if (key === 'Enter') {
      event.preventDefault();
      if (open) closePicker();
      return;
    }
    if (key === 'Escape' && open) {
      event.preventDefault();
      closePicker();
      return;
    }
    if (key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      openPicker();
      return;
    }
    if (resolvedFormat === '12' && section === SECTION_PERIOD) {
      var lower = key.toLowerCase();
      if (lower === 'a') {
        event.preventDefault();
        setSectionValue(SECTION_PERIOD, 'AM');
      } else if (lower === 'p') {
        event.preventDefault();
        setSectionValue(SECTION_PERIOD, 'PM');
      }
      return;
    }
    if (/^\d$/.test(key)) {
      event.preventDefault();
      var _next2 = applyDigit(Number(key));
      if (_next2 !== section) {
        focusSection(_next2);
      } else {
        event.currentTarget.focus();
      }
    }
  }, [activeSection, applyDigit, clearActiveSection, closePicker, commitPendingBuffer, disabled, firstSection, focusSection, incrementSection, lastSection, moveSection, open, openPicker, readOnly, resolvedFormat, segmentFocused, setActiveSection, setSectionValue]);
  (0, _react.useEffect)(function () {
    if (!segmentFocused || readOnly || disabled) return;
    var activeSegment = segmentRefs.current[activeSection];
    if (activeSegment && document.activeElement !== activeSegment) {
      activeSegment.focus();
    }
  }, [activeSection, disabled, readOnly, segmentFocused]);
  var handleCalendarSelect = (0, _react.useCallback)(function (nextDateValue) {
    var parsed = parseCalendarSelection(nextDateValue);
    if (!parsed) return;
    var seededTimeSections = getSeededTimeSections(sections, resolvedFormat, showSeconds);
    var nextSections = _extends({}, sections, {
      day: parsed.day,
      month: parsed.month,
      year: parsed.year
    }, seededTimeSections);
    var isSameSelection = nextSections.day === sections.day && nextSections.month === sections.month && nextSections.year === sections.year && nextSections.hour === sections.hour && nextSections.minute === sections.minute && nextSections.second === sections.second && nextSections.period === sections.period;
    if (isSameSelection) return;
    suppressTimePartialSyncRef.current = true;
    setPendingDigits({});
    editStateRef.current = {
      section: activeSection,
      buffer: ''
    };
    activeSectionRef.current = SECTION_HOUR;
    setActiveSection(SECTION_HOUR);
    commitSections(nextSections);
  }, [activeSection, commitSections, resolvedFormat, sections, setActiveSection, setPendingDigits, showSeconds]);
  var handleTimeSelect = (0, _react.useCallback)(function (_ref3) {
    var nextTime = _ref3.value;
    setPendingDigits({});
    editStateRef.current = {
      section: activeSection,
      buffer: ''
    };
    if (!nextTime) {
      // Incomplete picker selection — preserve existing sections.
      return;
    }
    var match = /^(\d{2}):(\d{2}):(\d{2})$/.exec(nextTime);
    if (!match) return;
    var hour24 = Number(match[1]);
    var minute = Number(match[2]);
    var second = Number(match[3]);
    var nextHour;
    var nextPeriod;
    if (resolvedFormat === '12') {
      nextPeriod = hour24 < 12 ? 'AM' : 'PM';
      nextHour = hour24 % 12 || 12;
    } else {
      nextHour = hour24;
      nextPeriod = undefined;
    }
    commitSections(_extends({}, sections, getSeededDateSections(sections), {
      hour: nextHour,
      minute: minute,
      second: second,
      period: nextPeriod
    }));
  }, [activeSection, commitSections, resolvedFormat, sections, setPendingDigits]);

  // TimeInput section constants (0–3) → DateTimeInput section constants (3–6)
  var TIME_TO_DT_SECTION = (0, _react.useMemo)(function () {
    return [SECTION_HOUR, SECTION_MINUTE, SECTION_SECOND, SECTION_PERIOD];
  }, []);
  var handleTimePartialChange = (0, _react.useCallback)(function (timeSections, changedTimeSectionIndex) {
    if (suppressTimePartialSyncRef.current) {
      suppressTimePartialSyncRef.current = false;
      return;
    }

    // Sync the active spinbutton segment to the column being edited
    var dtSection = TIME_TO_DT_SECTION[changedTimeSectionIndex];
    if (dtSection !== undefined) setActiveSection(dtSection);

    // Update display state with partial time fields immediately so the
    // input shows values as each column is selected, not only on
    // completion.
    setSections(function (prev) {
      var _timeSections$hour, _timeSections$minute, _timeSections$second, _timeSections$period;
      var mergedTimeSections = _extends({}, prev, {
        hour: (_timeSections$hour = timeSections.hour) != null ? _timeSections$hour : prev.hour,
        minute: (_timeSections$minute = timeSections.minute) != null ? _timeSections$minute : prev.minute
      }, showSeconds ? {
        second: (_timeSections$second = timeSections.second) != null ? _timeSections$second : prev.second
      } : {}, resolvedFormat === '12' ? {
        period: (_timeSections$period = timeSections.period) != null ? _timeSections$period : prev.period
      } : {});
      return _extends({}, prev, getSeededDateSections(prev), getSeededTimeSections(mergedTimeSections, resolvedFormat, showSeconds));
    });
  }, [resolvedFormat, setActiveSection, setSections, showSeconds, TIME_TO_DT_SECTION]);
  var timeValue = (0, _react.useMemo)(function () {
    var _sections$minute2, _sections$second2;
    if (sections.hour === undefined) {
      return undefined;
    }
    if (showSeconds && sections.second === undefined) return undefined;
    var minute = (_sections$minute2 = sections.minute) != null ? _sections$minute2 : 0;
    var resolvedSecond = (_sections$second2 = sections.second) != null ? _sections$second2 : 0;
    if (resolvedFormat === '12') {
      var hour24 = sections.hour % 12;
      if ((sections.period || 'AM') === 'PM') hour24 += 12;
      return (0, _dates.pad)(hour24) + ":" + (0, _dates.pad)(minute) + ":" + (0, _dates.pad)(resolvedSecond);
    }
    return (0, _dates.pad)(sections.hour) + ":" + (0, _dates.pad)(minute) + ":" + (0, _dates.pad)(resolvedSecond);
  }, [resolvedFormat, sections, showSeconds]);
  var showActiveSection = (segmentFocused || open) && !readOnly && !disabled;
  var _formContext$useFormF = formContext.useFormField({}),
    inForm = _formContext$useFormF.inForm;
  var formFieldLabelId = inForm && id ? "grommet-" + id + "__label" : undefined;
  var groupLabel = formFieldLabelId ? undefined : formatMessage({
    id: 'dateTimeInput.inputLabel',
    messages: messages
  });
  var CalendarIcon = ((_theme$dateTimeInput2 = theme.dateTimeInput) == null || (_theme$dateTimeInput2 = _theme$dateTimeInput2.icon) == null ? void 0 : _theme$dateTimeInput2.calendar) || _Calendar.Calendar;
  var dropTarget = containerRef.current;
  var generatedId = (0, _react.useId)();
  var dropId = (id || generatedId) + "__drop";
  var hiddenInput = name ? /*#__PURE__*/_react["default"].createElement("input", {
    "aria-hidden": "true",
    name: name,
    readOnly: true,
    tabIndex: -1,
    type: "hidden",
    value: value || ''
  }) : null;
  var pickerContent = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    role: "group",
    "aria-label": groupLabel,
    "aria-labelledby": formFieldLabelId,
    direction: "row",
    pad: (_theme$dateTimeInput3 = theme.dateTimeInput) == null || (_theme$dateTimeInput3 = _theme$dateTimeInput3.drop) == null ? void 0 : _theme$dateTimeInput3.pad,
    gap: (_theme$dateTimeInput4 = theme.dateTimeInput) == null || (_theme$dateTimeInput4 = _theme$dateTimeInput4.drop) == null ? void 0 : _theme$dateTimeInput4.gap
  }, /*#__PURE__*/_react["default"].createElement(_ThemeContext.ThemeContext.Extend, {
    value: {
      calendar: {
        day: {
          selected: {
            background: ((_theme$dateTimeInput5 = theme.dateTimeInput) == null || (_theme$dateTimeInput5 = _theme$dateTimeInput5.calendar) == null || (_theme$dateTimeInput5 = _theme$dateTimeInput5.day) == null || (_theme$dateTimeInput5 = _theme$dateTimeInput5.selected) == null ? void 0 : _theme$dateTimeInput5.background) || ((_theme$calendar = theme.calendar) == null || (_theme$calendar = _theme$calendar.day) == null || (_theme$calendar = _theme$calendar.selected) == null ? void 0 : _theme$calendar.background)
          }
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_Calendar2.Calendar, {
    date: getCalendarDate(sections),
    initialFocus: inline ? undefined : 'days',
    onSelect: disabled || readOnly ? undefined : handleCalendarSelect
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    alignSelf: "stretch",
    flex: false,
    border: {
      side: 'start',
      color: (_theme$dateTimeInput6 = theme.dateTimeInput) == null || (_theme$dateTimeInput6 = _theme$dateTimeInput6.drop) == null || (_theme$dateTimeInput6 = _theme$dateTimeInput6.border) == null ? void 0 : _theme$dateTimeInput6.color,
      size: (_theme$dateTimeInput7 = theme.dateTimeInput) == null || (_theme$dateTimeInput7 = _theme$dateTimeInput7.drop) == null || (_theme$dateTimeInput7 = _theme$dateTimeInput7.border) == null ? void 0 : _theme$dateTimeInput7.size
    }
  }), /*#__PURE__*/_react["default"].createElement(_TimeInput.TimeInput, {
    inline: true,
    format: resolvedFormat,
    value: timeValue,
    showSeconds: showSeconds,
    messages: messages,
    minuteStep: normalizedMinuteStep,
    disabled: disabled,
    readOnly: readOnly,
    onChange: disabled || readOnly ? undefined : handleTimeSelect,
    onPartialChange: disabled || readOnly ? undefined : handleTimePartialChange
  }));
  if (inline) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("input", _extends({}, rest, {
      "aria-hidden": "true",
      id: id,
      name: name,
      readOnly: true,
      ref: inputRef,
      tabIndex: -1,
      type: "hidden",
      value: value || ''
    })), pickerContent);
  }
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: open ? closePicker : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, null, /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInputContainer, _extends({
    ref: containerRef,
    direction: "row",
    border: !plainProp,
    fill: true,
    round: (_theme$dateTimeInput8 = theme.dateTimeInput) == null || (_theme$dateTimeInput8 = _theme$dateTimeInput8.container) == null ? void 0 : _theme$dateTimeInput8.round,
    disabled: disabled,
    readOnlyProp: readOnly,
    focusIndicator: focusIndicatorProp != null ? focusIndicatorProp : true
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInputField, passThemeFlag, /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInputDisplay, _extends({
    role: "group",
    "aria-label": groupLabel,
    "aria-labelledby": formFieldLabelId,
    onMouseDown: onDisplayMouseDown
  }, passThemeFlag), displaySections.map(function (_ref4) {
    var section = _ref4.section,
      prefix = _ref4.prefix,
      text = _ref4.text,
      filled = _ref4.filled;
    var sectionLimits = getSectionLimits(section, resolvedFormat, sections);
    var key = (0, _sectionHelpers.getSectionKeyFromType)(sectionTypeFromSection(section));
    var numericValue;
    if (section === SECTION_PERIOD) {
      numericValue = sections[key] === 'PM' ? 1 : 0;
    } else {
      var _sections$key;
      numericValue = (_sections$key = sections[key]) != null ? _sections$key : sectionLimits.min;
    }
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: section
    }, !!prefix && /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInputSeparator, _extends({
      $filled: hasDisplayValue,
      $paddingInline: dateTimeSeparatorPadding
    }, passThemeFlag), prefix), /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInputSegment, _extends({
      ref: function ref(segmentNode) {
        segmentRefs.current[section] = segmentNode;
      },
      tabIndex: !readOnly && !disabled && activeSection === section ? 0 : -1,
      $active: showActiveSection && activeSection === section,
      $filled: filled,
      onFocus: function onFocus() {
        return onSegmentFocus(section);
      },
      onBlur: onSegmentBlur,
      onKeyDown: function onKeyDown(event) {
        return onSegmentKeyDown(section, event);
      },
      "data-section": section,
      role: "spinbutton",
      "aria-label": getSectionName(section, formatMessage, messages),
      "aria-disabled": disabled || undefined,
      "aria-readonly": readOnly || undefined,
      "aria-valuenow": numericValue,
      "aria-valuemin": sectionLimits.min,
      "aria-valuemax": sectionLimits.max,
      "aria-valuetext": sectionValueAnnouncement(section)
    }, passThemeFlag), text));
  })), /*#__PURE__*/_react["default"].createElement(_StyledDateTimeInput.StyledDateTimeInput, _extends({
    tabIndex: -1
  }, rest, {
    id: id,
    ref: inputRef,
    value: inputValue,
    "aria-hidden": "true",
    disabled: disabled,
    readOnly: true,
    focusIndicator: false,
    plain: true
  }))), !readOnly && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    ref: triggerRef,
    icon: /*#__PURE__*/_react["default"].createElement(CalendarIcon, null),
    plain: true,
    disabled: disabled,
    margin: (_theme$dateTimeInput9 = theme.dateTimeInput) == null || (_theme$dateTimeInput9 = _theme$dateTimeInput9.button) == null ? void 0 : _theme$dateTimeInput9.margin,
    "aria-label": formatMessage({
      id: 'dateTimeInput.chooseDateTime',
      messages: messages
    }),
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": dropId,
    onClick: open ? closePicker : openPicker
  })), hiddenInput, open && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, {
    id: dropId,
    target: dropTarget,
    align: {
      top: 'bottom',
      left: 'left'
    },
    onEsc: closePicker,
    onClickOutside: closePicker
  }, pickerContent)));
});
DateTimeInput.displayName = 'DateTimeInput';
if (process.env.NODE_ENV !== 'production') {
  DateTimeInput.propTypes = _propTypes.DateTimeInputPropTypes;
}