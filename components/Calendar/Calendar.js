"use strict";

exports.__esModule = true;
exports.getOutputFormat = exports.Calendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _MessageContext = require("../../contexts/MessageContext");
var _Box = require("../Box");
var _Button = require("../Button");
var _Header = require("../Header");
var _Heading = require("../Heading");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _propTypes = require("./propTypes");
var _StyledCalendar = require("./StyledCalendar");
var _utils = require("./utils");
var _dates = require("../../utils/dates");
var _useThemeValue3 = require("../../utils/useThemeValue");
var _excluded = ["activeDate", "animate", "bounds", "children", "date", "dates", "daysOfWeek", "disabled", "initialFocus", "fill", "firstDayOfWeek", "header", "level", "locale", "messages", "onReference", "onSelect", "range", "reference", "responsive", "showAdjacentDays", "size", "timestamp"],
  _excluded2 = ["container"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var getLocaleString = function getLocaleString(value, locale) {
  return value == null ? void 0 : value.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
var currentlySelectedString = function currentlySelectedString(value, locale) {
  var selected;
  if (value instanceof Date) {
    selected = "Currently selected " + getLocaleString(value, locale) + ";";
  } else if (value != null && value.length) {
    selected = "Currently selected " + value.map(function (item) {
      var dates;
      if (!Array.isArray(item)) {
        dates = "" + getLocaleString(item, locale);
      } else {
        var start = item[0] !== undefined ? getLocaleString(item[0], locale) : 'none';
        var end = item[1] !== undefined ? getLocaleString(item[1], locale) : 'none';
        dates = start + " through " + end;
      }
      return dates;
    });
  } else {
    selected = 'No date selected';
  }
  return selected;
};

// calendar value may be a single date, multiple dates, a range of dates
// supplied as ISOstrings.
var _normalizeInput = function normalizeInput(dateValue) {
  var result;
  if (dateValue instanceof Date) {
    result = dateValue;
  }
  // date may be an empty string ''
  else if (typeof dateValue === 'string' && dateValue.length) {
    result = (0, _dates.setHoursWithOffset)(dateValue);
  } else if (Array.isArray(dateValue)) {
    result = dateValue.map(function (d) {
      return _normalizeInput(d);
    });
  }
  return result;
};
var _normalizeOutput = function normalizeOutput(dateValue, outputFormat) {
  var result;
  var normalize = function normalize(value) {
    var normalizedValue = value.toISOString();
    if (normalizedValue && outputFormat === 'no timezone') {
      var _handleOffset$toISOSt = (0, _utils.handleOffset)(normalizedValue).toISOString().split('T');
      normalizedValue = _handleOffset$toISOSt[0];
    }
    return normalizedValue;
  };
  if (dateValue instanceof Date) {
    result = normalize(dateValue);
  } else if (typeof dateValue === 'undefined') {
    result = undefined;
  } else {
    result = dateValue.map(function (d) {
      return _normalizeOutput(d, outputFormat);
    });
  }
  return result;
};

// format value to [[]] for internal functions
var normalizeRange = function normalizeRange(value, activeDate) {
  var range = value;
  if (range instanceof Date) range = activeDate === 'start' ? [[undefined, range]] : [[range, undefined]];else if (Array.isArray(range) && !Array.isArray(range[0])) range = [range];
  return range;
};
var getReference = function getReference(reference, value, activeDate) {
  var nextReference;
  if (value) {
    if (Array.isArray(value)) {
      if (value[0] instanceof Date) {
        // if we just selected an end date, active date will be 'start'
        // and we should set the reference to the end date
        if (activeDate === 'start' && value[1] instanceof Date) {
          nextReference = value[1];
        } else {
          nextReference = value[0];
        }
      } else if (Array.isArray(value[0])) {
        // if we just selected an end date, active date will be 'start'
        // and we should set the reference to the end date
        if (activeDate === 'start' && value[0][1]) {
          // eslint-disable-next-line prefer-destructuring
          nextReference = value[0][1];
        } else {
          nextReference = value[0][0] ? value[0][0] : value[0][1];
        }
      } else {
        nextReference = new Date();
        nextReference.setHours(0, 0, 0, 0);
      }
    } else nextReference = value;
  } else if (reference) {
    nextReference = reference;
  } else {
    nextReference = new Date();
    nextReference.setHours(0, 0, 0, 0);
  }
  return nextReference;
};
var buildDisplayBounds = function buildDisplayBounds(reference, firstDayOfWeek) {
  var start = new Date(reference);
  start.setDate(1); // first of month

  // In case Sunday is the first day of the month, and the user asked for Monday
  // to be the first day of the week, then we need to include Sunday and six
  // days prior.
  start = start.getDay() === 0 && firstDayOfWeek === 1 ? start = (0, _utils.subtractDays)(start, 6) :
  // beginning of week
  start = (0, _utils.subtractDays)(start, start.getDay() - firstDayOfWeek);
  var end = (0, _utils.addDays)(start, 7 * 5 + 7); // 5 weeks to end of week
  return [start, end];
};
var monthBounds = function monthBounds(reference) {
  var start = new Date(reference);
  start.setDate(1); // first of month
  var end = (0, _utils.endOfMonth)(start);
  return [start, end];
};
var disabledCalendarPreviousMonthButton = function disabledCalendarPreviousMonthButton(date, reference, bounds) {
  if (!bounds) return false;
  var lastBound = new Date(bounds[1]);
  return !(0, _utils.sameDayOrBefore)(lastBound, reference) && !(0, _utils.betweenDates)(date, bounds);
};
var disabledCalendarNextMonthButton = function disabledCalendarNextMonthButton(date, reference, bounds) {
  if (!bounds) return false;
  var firstBound = new Date(bounds[0]);
  return !(0, _utils.sameDayOrAfter)(firstBound, reference) && !(0, _utils.betweenDates)(date, bounds);
};
var _getOutputFormat = exports.getOutputFormat = function getOutputFormat(dates) {
  if (typeof dates === 'string' && (dates == null ? void 0 : dates.indexOf('T')) === -1) {
    return 'no timezone';
  }
  if (Array.isArray(dates)) {
    return _getOutputFormat(dates[0]);
  }
  return 'date timezone';
};
var millisecondsPerYear = 31557600000;
var CalendarDay = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var activeProp = _ref.activeProp,
    children = _ref.children,
    day = _ref.day,
    disabledProp = _ref.disabledProp,
    fill = _ref.fill,
    size = _ref.size,
    isInRange = _ref.isInRange,
    isSelected = _ref.isSelected,
    otherMonth = _ref.otherMonth,
    rangePosition = _ref.rangePosition,
    _ref$buttonProps = _ref.buttonProps,
    buttonProps = _ref$buttonProps === void 0 ? {} : _ref$buttonProps,
    responsive = _ref.responsive;
  var _useThemeValue = (0, _useThemeValue3.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
    role: "gridcell",
    "aria-selected": isSelected,
    inRange: isInRange,
    isSelected: isSelected,
    rangePosition: rangePosition,
    sizeProp: size,
    fillContainer: fill,
    responsive: responsive
  }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayButton, _extends({
    "aria-disabled": disabledProp,
    disabledProp: disabledProp,
    fill: fill,
    plain: true,
    tabIndex: (activeProp == null ? void 0 : activeProp.getTime()) === (day == null ? void 0 : day.getTime()) ? 0 : -1,
    responsive: responsive
  }, buttonProps, {
    ref: (activeProp == null ? void 0 : activeProp.getTime()) === (day == null ? void 0 : day.getTime()) ? ref : undefined
  }), function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, _extends({
      disabledProp: disabledProp,
      hover: hover,
      inRange: isInRange,
      isSelected: isSelected,
      otherMonth: otherMonth,
      sizeProp: size,
      fillContainer: fill,
      responsive: responsive
    }, passThemeFlag), children);
  }));
});
var CalendarCustomDay = function CalendarCustomDay(_ref3) {
  var ariaSelected = _ref3['aria-selected'],
    children = _ref3.children,
    fill = _ref3.fill,
    size = _ref3.size,
    buttonProps = _ref3.buttonProps,
    responsive = _ref3.responsive;
  if (!buttonProps) {
    return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
      "aria-selected": ariaSelected,
      role: "gridcell",
      sizeProp: size,
      fillContainer: fill,
      responsive: responsive
    }, children);
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
    "aria-selected": ariaSelected,
    role: "gridcell",
    sizeProp: size,
    fillContainer: fill,
    responsive: responsive
  }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayButton, _extends({
    fill: fill,
    responsive: responsive
  }, buttonProps), children));
};
var Calendar = exports.Calendar = /*#__PURE__*/(0, _react.forwardRef)(function (_ref4, ref) {
  var activeDateProp = _ref4.activeDate,
    _ref4$animate = _ref4.animate,
    animate = _ref4$animate === void 0 ? true : _ref4$animate,
    boundsProp = _ref4.bounds,
    children = _ref4.children,
    dateProp = _ref4.date,
    datesProp = _ref4.dates,
    daysOfWeek = _ref4.daysOfWeek,
    disabled = _ref4.disabled,
    initialFocus = _ref4.initialFocus,
    fill = _ref4.fill,
    _ref4$firstDayOfWeek = _ref4.firstDayOfWeek,
    firstDayOfWeek = _ref4$firstDayOfWeek === void 0 ? 0 : _ref4$firstDayOfWeek,
    header = _ref4.header,
    level = _ref4.level,
    _ref4$locale = _ref4.locale,
    locale = _ref4$locale === void 0 ? 'en-US' : _ref4$locale,
    messages = _ref4.messages,
    onReference = _ref4.onReference,
    onSelect = _ref4.onSelect,
    range = _ref4.range,
    referenceProp = _ref4.reference,
    _ref4$responsive = _ref4.responsive,
    responsiveProp = _ref4$responsive === void 0 ? true : _ref4$responsive,
    _ref4$showAdjacentDay = _ref4.showAdjacentDays,
    showAdjacentDays = _ref4$showAdjacentDay === void 0 ? true : _ref4$showAdjacentDay,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 'medium' : _ref4$size,
    timestampProp = _ref4.timestamp,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  var _useThemeValue2 = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue2.theme,
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;

  // If fill is true the responsive behavior isn't needed.
  var responsive = responsiveProp && !fill;

  // set activeDate when caller changes it, allows us to change
  // it internally too
  var _useState = (0, _react.useState)(dateProp && typeof dateProp === 'string' && range ? 'end' : 'start'),
    activeDate = _useState[0],
    setActiveDate = _useState[1];
  (0, _react.useEffect)(function () {
    if (activeDateProp) setActiveDate(activeDateProp);
  }, [activeDateProp]);
  var _useState2 = (0, _react.useState)(_normalizeInput(dateProp || datesProp)),
    value = _useState2[0],
    setValue = _useState2[1];
  (0, _react.useEffect)(function () {
    var val = dateProp || datesProp;
    setValue(_normalizeInput(val));
  }, [dateProp, datesProp]);
  var _useState3 = (0, _react.useState)(getReference(_normalizeInput(referenceProp), value, activeDate)),
    reference = _useState3[0],
    setReference = _useState3[1];
  (0, _react.useEffect)(function () {
    if (value) {
      setReference(getReference(_normalizeInput(referenceProp), value, activeDate));
    }
  }, [referenceProp, value, activeDate]);
  var _useState4 = (0, _react.useState)(_getOutputFormat(dateProp || datesProp)),
    outputFormat = _useState4[0],
    setOutputFormat = _useState4[1];
  (0, _react.useEffect)(function () {
    setOutputFormat(_getOutputFormat(dateProp || datesProp));
  }, [dateProp, datesProp]);

  // normalize bounds
  var _useState5 = (0, _react.useState)(boundsProp),
    bounds = _useState5[0],
    setBounds = _useState5[1];
  (0, _react.useEffect)(function () {
    if (boundsProp) setBounds(boundsProp);else setBounds(undefined);
  }, [boundsProp]);

  // calculate the bounds we display based on the reference
  var _useState6 = (0, _react.useState)(buildDisplayBounds(reference, firstDayOfWeek)),
    displayBounds = _useState6[0],
    setDisplayBounds = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    targetDisplayBounds = _useState7[0],
    setTargetDisplayBounds = _useState7[1];
  var _useState8 = (0, _react.useState)(),
    slide = _useState8[0],
    setSlide = _useState8[1];
  var _useState9 = (0, _react.useState)(),
    animating = _useState9[0],
    setAnimating = _useState9[1];

  // When the reference changes, we need to update the displayBounds.
  // This is easy when we aren't animating. If we are animating,
  // we temporarily increase the displayBounds to be the union of the old
  // and new ones and set slide to drive the animation. We keep track
  // of where we are heading via targetDisplayBounds. When the animation
  // finishes, we prune displayBounds down to where we are headed and
  // clear the slide and targetDisplayBounds.
  (0, _react.useEffect)(function () {
    var nextDisplayBounds = buildDisplayBounds(reference, firstDayOfWeek);

    // Checks if the difference between the current and next DisplayBounds is
    // greater than a year. If that's the case, calendar should update without
    // animation.
    if (nextDisplayBounds[0].getTime() !== displayBounds[0].getTime() && nextDisplayBounds[1].getTime() !== displayBounds[1].getTime()) {
      var diffBoundsAboveYear = false;
      if (nextDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        if (displayBounds[0].getTime() - nextDisplayBounds[0].getTime() > millisecondsPerYear) {
          diffBoundsAboveYear = true;
        }
      } else if (nextDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (nextDisplayBounds[1].getTime() - displayBounds[1].getTime() > millisecondsPerYear) {
          diffBoundsAboveYear = true;
        }
      }
      if (!animate || diffBoundsAboveYear) {
        setDisplayBounds(nextDisplayBounds);
      } else {
        setTargetDisplayBounds(nextDisplayBounds);
      }
    }
  }, [animate, firstDayOfWeek, reference, displayBounds]);
  (0, _react.useEffect)(function () {
    // if the reference timezone has changed (e.g., controlled component),
    // both ends of the displayBounds should inherit that new timestamp
    if (targetDisplayBounds) {
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime() || targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        setDisplayBounds([targetDisplayBounds[0], targetDisplayBounds[1]]);
      }
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        // only animate if the duration is within a year
        if (displayBounds[0].getTime() - targetDisplayBounds[0].getTime() < millisecondsPerYear && (0, _utils.daysApart)(displayBounds[0], targetDisplayBounds[0])) {
          setSlide({
            direction: 'down',
            weeks: (0, _utils.daysApart)(displayBounds[0], targetDisplayBounds[0]) / 7
          });
          setAnimating(true);
        }
      } else if (targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (targetDisplayBounds[1].getTime() - displayBounds[1].getTime() < millisecondsPerYear && (0, _utils.daysApart)(targetDisplayBounds[1], displayBounds[1])) {
          setSlide({
            direction: 'up',
            weeks: (0, _utils.daysApart)(targetDisplayBounds[1], displayBounds[1]) / 7
          });
          setAnimating(true);
        }
      }
      return undefined;
    }
    setSlide(undefined);
    return undefined;
  }, [animating, displayBounds, targetDisplayBounds]);

  // Last step in updating the displayBounds. Allows for pruning
  // displayBounds and cleaning up states to occur after animation.
  (0, _react.useEffect)(function () {
    if (animating && targetDisplayBounds) {
      // Wait for animation to finish before cleaning up.
      var timer = setTimeout(function () {
        setDisplayBounds(targetDisplayBounds);
        setTargetDisplayBounds(undefined);
        setSlide(undefined);
        setAnimating(false);
      }, 400 // Empirically determined.
      );
      return function () {
        return clearTimeout(timer);
      };
    }
    return undefined;
  }, [animating, targetDisplayBounds]);

  // We have to deal with reference being the end of a month with more
  // days than the month we are changing to. So, we always set reference
  // to the first of the month before changing the month.
  var previousMonth = (0, _react.useMemo)(function () {
    return (0, _utils.endOfMonth)((0, _utils.subtractMonths)((0, _utils.startOfMonth)(reference), 1));
  }, [reference]);
  var nextMonth = (0, _react.useMemo)(function () {
    return (0, _utils.startOfMonth)((0, _utils.addMonths)((0, _utils.startOfMonth)(reference), 1));
  }, [reference]);
  var initialFocusDate = showAdjacentDays ? new Date(displayBounds[0]) : (0, _utils.startOfMonth)(reference);
  var _useState0 = (0, _react.useState)(),
    focus = _useState0[0],
    setFocus = _useState0[1];
  var _useState1 = (0, _react.useState)(initialFocusDate),
    active = _useState1[0],
    setActive = _useState1[1];
  var focusableDateRef = (0, _react.useRef)(undefined);
  (0, _react.useEffect)(function () {
    if (focusableDateRef != null && focusableDateRef.current && initialFocus === 'days') focusableDateRef.current.focus();
  }, [initialFocus, focusableDateRef]);
  var handleReference = (0, _react.useCallback)(function (nextReference) {
    setReference(nextReference);
    if (onReference) onReference(nextReference.toISOString());
  }, [onReference]);
  var changeReference = (0, _react.useCallback)(function (nextReference) {
    if ((0, _utils.betweenDates)(nextReference, bounds)) handleReference(nextReference);
  }, [handleReference, bounds]);
  var changeCalendarMonth = function changeCalendarMonth(messageId, newMonth) {
    handleReference(newMonth);
    var referenceStartOfMonth = (0, _utils.startOfMonth)(reference);
    var firstOfMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1, referenceStartOfMonth.getHours(), referenceStartOfMonth.getMinutes(), referenceStartOfMonth.getSeconds());
    setActive(firstOfMonth);
    announce(format({
      id: messageId,
      messages: messages,
      values: {
        date: newMonth.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })
      }
    }));
  };
  var handleRange = (0, _react.useCallback)(function (selectedDate) {
    var _priorRange$, _priorRange$2;
    var result;
    var priorRange = normalizeRange(value, activeDate);
    // deselect when date clicked was the start/end of the range
    if (selectedDate.getTime() === (priorRange == null || (_priorRange$ = priorRange[0]) == null || (_priorRange$ = _priorRange$[0]) == null ? void 0 : _priorRange$.getTime())) {
      result = [[undefined, priorRange[0][1]]];
      setActiveDate('start');
    } else if (selectedDate.getTime() === (priorRange == null || (_priorRange$2 = priorRange[0]) == null || (_priorRange$2 = _priorRange$2[1]) == null ? void 0 : _priorRange$2.getTime())) {
      result = [[priorRange[0][0], undefined]];
      setActiveDate('end');
    }
    // selecting start date
    else if (activeDate === 'start') {
      if (!priorRange) {
        result = [[selectedDate, undefined]];
      } else if (!priorRange[0][1]) {
        result = [[selectedDate, priorRange[0][1]]];
      } else if (selectedDate.getTime() < priorRange[0][1].getTime()) {
        result = [[selectedDate, priorRange[0][1]]];
      } else if (selectedDate.getTime() > priorRange[0][1].getTime()) {
        result = [[selectedDate, undefined]];
      }
      setActiveDate('end');
    }
    // selecting end date
    else if (!priorRange) {
      result = [[undefined, selectedDate]];
      setActiveDate('start');
    } else if (selectedDate.getTime() < priorRange[0][0].getTime()) {
      result = [[selectedDate, undefined]];
      setActiveDate('end');
    } else if (selectedDate.getTime() > priorRange[0][0].getTime()) {
      result = [[priorRange[0][0], selectedDate]];
      setActiveDate('start');
    }

    // If no dates selected, always return undefined; else format
    // result according to specified range value.
    if (result[0].includes(undefined)) {
      if (range === 'array') {
        result = !result[0][0] && !result[0][1] ? undefined : result;
      } else {
        result = result[0].find(function (d) {
          return d !== undefined;
        });
      }
    }
    setValue(result);
    return result;
  }, [activeDate, value, range]);
  var selectDate = (0, _react.useCallback)(function (selectedDate) {
    var nextValue;
    if (range || Array.isArray(value == null ? void 0 : value[0])) {
      nextValue = handleRange(selectedDate);
    } else {
      nextValue = selectedDate;
    }
    if (onSelect) {
      nextValue = _normalizeOutput(nextValue, outputFormat);
      onSelect(nextValue);
    }
  }, [handleRange, onSelect, outputFormat, range, value]);
  var onClick = function onClick(selectedDate) {
    selectDate(selectedDate);
    announce("Selected " + getLocaleString(selectedDate, locale), 'assertive');
    setActive(selectedDate);
  };
  var renderCalendarHeader = function renderCalendarHeader() {
    var _theme$calendar$size;
    var PreviousIcon = size === 'small' ? theme.calendar.icons.small.previous : theme.calendar.icons.previous;
    var NextIcon = size === 'small' ? theme.calendar.icons.small.next : theme.calendar.icons.next;
    var monthAndYear = reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    });

    // theme.calendar.heading.level should be removed in v3 of grommet
    // theme.calendar[size].title should be used instead
    var headingLevel;
    if (level !== undefined) {
      headingLevel = level;
    } else if (size === 'small') {
      headingLevel = theme.calendar.heading && theme.calendar.heading.level || 4;
    } else {
      headingLevel = (theme.calendar.heading && theme.calendar.heading.level || 4) - 1;
    }
    var _ref5 = ((_theme$calendar$size = theme.calendar[size]) == null ? void 0 : _theme$calendar$size.title) || undefined,
      containerTheme = _ref5.container,
      textTheme = _objectWithoutPropertiesLoose(_ref5, _excluded2);
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row",
      justify: "between",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Header.Header, {
      flex: true,
      pad: containerTheme.pad
    }, Object.keys(textTheme).length !== 0 ? /*#__PURE__*/_react["default"].createElement(_Text.Text, textTheme, monthAndYear) : /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
      level: headingLevel,
      size: size,
      margin: "none",
      overflowWrap: "normal"
    }, monthAndYear)), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: format({
        id: 'calendar.previous',
        messages: messages,
        values: {
          date: previousMonth.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric'
          })
        }
      }),
      icon: /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: disabledCalendarPreviousMonthButton(previousMonth, reference, bounds),
      onClick: function onClick() {
        return changeCalendarMonth('calendar.previousMove', previousMonth);
      }
    }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: format({
        id: 'calendar.next',
        messages: messages,
        values: {
          date: nextMonth.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric'
          })
        }
      }),
      icon: /*#__PURE__*/_react["default"].createElement(NextIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: disabledCalendarNextMonthButton(nextMonth, reference, bounds),
      onClick: function onClick() {
        return changeCalendarMonth('calendar.nextMove', nextMonth);
      }
    })));
  };
  var renderDaysOfWeek = function renderDaysOfWeek() {
    var day = new Date(displayBounds[0]);
    var days = [];
    while (days.length < 7) {
      days.push(/*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        role: "gridcell",
        key: days.length,
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      }, day.toLocaleDateString(locale, {
        weekday: 'narrow'
      }))));
      day = (0, _utils.addDays)(day, 1);
    }
    return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek, {
      role: "row"
    }, days);
  };
  var weeks = [];
  var day = new Date(displayBounds[0]);
  var days;
  var firstDayInMonth;
  var blankWeek = false;
  var _loop = function _loop() {
    if (day.getDay() === firstDayOfWeek) {
      if (days) {
        weeks.push(/*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek, {
          role: "row",
          key: day.getTime(),
          fillContainer: fill
        }, days));
      }
      days = [];
    }
    var otherMonth = day.getMonth() !== reference.getMonth();
    if (!showAdjacentDays && otherMonth) {
      days.push(/*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      })));
      if (weeks.length === 5 &&
      /* If the length days array is less than the current getDate()
      we know that all days in the array are from the next month. */
      days.length < day.getDate()) {
        blankWeek = true;
      }
    } else if (
    /* Do not show adjacent days in 6th row if all days
    fall in the next month */
    showAdjacentDays === 'trim' && otherMonth && weeks.length === 5 &&
    /* If the length days array is less than the current getDate()
    we know that all days in the array are from the next month. */
    days.length < day.getDate()) {
      blankWeek = true;
      days.push(/*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        sizeProp: size,
        fillContainer: fill,
        responsive: responsive
      })));
    } else {
      var dateObject = day;
      // this.dayRefs[dateObject] = React.createRef();
      var selected = false;
      var inRange = false;
      var rangePosition;
      var _withinDates = (0, _utils.withinDates)(day, range ? normalizeRange(value, activeDate) : value),
        selectedState = _withinDates[0];
      if (selectedState === 2) {
        selected = true;
        var _withinDates2 = (0, _utils.withinDates)(day, range ? normalizeRange(value, activeDate) : value);
        rangePosition = _withinDates2[1];
      } else if (selectedState === 1) {
        inRange = true;
      }
      var dayDisabled = !!((0, _utils.withinDates)(day, _normalizeInput(disabled))[0] || bounds && !(0, _utils.betweenDates)(day, _normalizeInput(bounds)));
      if (!firstDayInMonth && !dayDisabled && day.getMonth() === reference.getMonth()) {
        firstDayInMonth = dateObject;
      }
      if (!children) {
        days.push(/*#__PURE__*/_react["default"].createElement(CalendarDay, {
          activeProp: active,
          day: day,
          key: day.getTime(),
          disabledProp: dayDisabled,
          buttonProps: {
            a11yTitle: day.toDateString(),
            onClick: dayDisabled ? function () {} : function () {
              return onClick(dateObject);
            }
          },
          isInRange: inRange,
          isSelected: selected,
          otherMonth: day.getMonth() !== reference.getMonth(),
          rangePosition: rangePosition,
          size: size,
          fill: fill,
          ref: focusableDateRef,
          responsive: responsive
        }, day.getDate()));
      } else {
        days.push(/*#__PURE__*/_react["default"].createElement(CalendarCustomDay, {
          key: day.getTime(),
          "aria-selected": selected,
          buttonProps: onSelect ? {
            a11yTitle: day.toDateString(),
            active: active && active.getTime() === day.getTime(),
            disabled: dayDisabled,
            onClick: dayDisabled ? function () {} : function () {
              return onClick(dateObject);
            }
          } : null,
          size: size,
          fill: fill,
          responsive: responsive
        }, children({
          date: day,
          day: day.getDate(),
          isInRange: inRange,
          isSelected: selected
        })));
      }
    }
    day = (0, _utils.addDays)(day, 1);
  };
  while (day.getTime() < displayBounds[1].getTime()) {
    _loop();
  }
  weeks.push(/*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek
  // if a week contains only blank days, for screen reader accessibility
  // we don't want to set role="row"
  , {
    role: !blankWeek ? 'row' : undefined,
    key: day.getTime(),
    fillContainer: fill
  }, days));

  // track if we need to focus when element becomes available
  var _useState10 = (0, _react.useState)(false),
    needsFocus = _useState10[0],
    setNeedsFocus = _useState10[1];
  // while the calendar contains focus, and is not animating, set
  // the focus to the active date

  // Focus management effect
  (0, _react.useEffect)(function () {
    if (!animating && active && focus) {
      setNeedsFocus(true);
    }
  }, [animating, active, focus]);
  (0, _react.useEffect)(function () {
    if (needsFocus && focusableDateRef != null && focusableDateRef.current) {
      focusableDateRef.current.focus();
      setNeedsFocus(false); // Reset flag after focus
    }
  }, [active, reference, displayBounds, needsFocus, focusableDateRef]);
  (0, _react.useEffect)(function () {
    if (bounds && active) {
      var normalizedBounds = _normalizeInput(bounds);
      if (!(0, _utils.betweenDates)(active, normalizedBounds)) {
        var diff1 = Math.abs(active.getTime() - normalizedBounds[0].getTime());
        var diff2 = Math.abs(active.getTime() - normalizedBounds[1].getTime());
        var closerDate = diff1 < diff2 ? 0 : 1;
        setActive(normalizedBounds[closerDate]);
      }
    }
  }, [active, bounds]);
  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledCalendar, _extends({
    ref: ref,
    sizeProp: size,
    fillContainer: fill,
    responsive: responsive
  }, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: fill
  }, header ? header({
    date: reference,
    locale: locale,
    onPreviousMonth: function onPreviousMonth() {
      changeReference(previousMonth);
      setActive(previousMonth);
      announce(format({
        id: 'calendar.previous',
        messages: messages,
        values: {
          date: previousMonth.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric'
          })
        }
      }));
    },
    onNextMonth: function onNextMonth() {
      changeReference(nextMonth);
      setActive(nextMonth);
      announce(format({
        id: 'calendar.next',
        messages: messages,
        values: {
          date: nextMonth.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric'
          })
        }
      }));
    },
    previousInBound: (0, _utils.betweenDates)(previousMonth, bounds),
    nextInBound: (0, _utils.betweenDates)(nextMonth, bounds)
  }) : renderCalendarHeader(previousMonth, nextMonth), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: true,
    role: "grid"
  }, daysOfWeek && renderDaysOfWeek(), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onUp: function onUp(event) {
      var nextActive = (0, _utils.addDays)(active, -7);
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll
      if (!!(0, _utils.betweenDates)(nextActive, _normalizeInput(bounds)) || !bounds) {
        setActive(nextActive);
        if (!(0, _utils.betweenDates)(nextActive, displayBounds) || !showAdjacentDays && !(0, _utils.betweenDates)(nextActive, monthBounds(reference))) {
          changeReference(nextActive);
        }
      }
    },
    onDown: function onDown(event) {
      var nextActive = (0, _utils.addDays)(active, 7);
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll
      if (!!(0, _utils.betweenDates)(nextActive, _normalizeInput(bounds)) || !bounds) {
        setActive(nextActive);
        if (!(0, _utils.betweenDates)(nextActive, displayBounds) || !showAdjacentDays && !(0, _utils.betweenDates)(nextActive, monthBounds(reference))) {
          changeReference(nextActive);
        }
      }
    },
    onLeft: function onLeft() {
      var nextActive = (0, _utils.addDays)(active, -1);
      if (!!(0, _utils.betweenDates)(nextActive, _normalizeInput(bounds)) || !bounds) {
        setActive(nextActive);
        if (!(0, _utils.betweenDates)(nextActive, displayBounds) || !showAdjacentDays && !(0, _utils.betweenDates)(nextActive, monthBounds(reference))) {
          changeReference(nextActive);
        }
      }
    },
    onRight: function onRight() {
      var nextActive = (0, _utils.addDays)(active, 1);
      if (!!(0, _utils.betweenDates)(nextActive, _normalizeInput(bounds)) || !bounds) {
        setActive(nextActive);
        if (!(0, _utils.betweenDates)(nextActive, displayBounds) || !showAdjacentDays && !(0, _utils.betweenDates)(nextActive, monthBounds(reference))) {
          changeReference(nextActive);
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeeksContainer, _extends({
    role: "rowgroup",
    "aria-label": reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    }) + "; " + currentlySelectedString(value, locale),
    sizeProp: size,
    fillContainer: fill,
    responsive: responsive,
    onFocus: function onFocus() {
      setFocus(true);
    },
    onBlur: function onBlur() {
      setFocus(false);
    }
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeeks, _extends({
    slide: slide,
    sizeProp: size,
    fillContainer: fill
  }, passThemeFlag), weeks))))));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = _propTypes.CalendarPropTypes;