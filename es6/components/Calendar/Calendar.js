var _excluded = ["activeDate", "animate", "bounds", "children", "date", "dates", "daysOfWeek", "disabled", "initialFocus", "fill", "firstDayOfWeek", "header", "level", "locale", "messages", "onReference", "onSelect", "range", "reference", "showAdjacentDays", "size", "timestamp"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { CalendarPropTypes } from './propTypes';
import { StyledCalendar, StyledDay, StyledDayContainer, StyledWeek, StyledWeeks, StyledWeeksContainer } from './StyledCalendar';
import { addDays, addMonths, betweenDates, daysApart, endOfMonth, handleOffset, sameDayOrAfter, sameDayOrBefore, startOfMonth, subtractDays, subtractMonths, withinDates } from './utils';
import { setHoursWithOffset } from '../../utils/dates';
import { useThemeValue } from '../../utils/useThemeValue';
import { useKeyboard } from '../../utils';
var headingPadMap = {
  small: 'xsmall',
  medium: 'small',
  large: 'medium'
};
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
    result = setHoursWithOffset(dateValue);
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
      var _handleOffset$toISOSt = handleOffset(normalizedValue).toISOString().split('T');
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
var getReference = function getReference(reference, value) {
  var nextReference;
  if (value) {
    if (Array.isArray(value)) {
      if (value[0] instanceof Date) {
        nextReference = value[0];
      } else if (Array.isArray(value[0])) {
        nextReference = value[0][0] ? value[0][0] : value[0][1];
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
  start = start.getDay() === 0 && firstDayOfWeek === 1 ? start = subtractDays(start, 6) :
  // beginning of week
  start = subtractDays(start, start.getDay() - firstDayOfWeek);
  var end = addDays(start, 7 * 5 + 7); // 5 weeks to end of week
  return [start, end];
};
var disabledCalendarPreviousMonthButton = function disabledCalendarPreviousMonthButton(date, reference, bounds) {
  if (!bounds) return false;
  var lastBound = new Date(bounds[1]);
  return !sameDayOrBefore(lastBound, reference) && !betweenDates(date, bounds);
};
var disabledCalendarNextMonthButton = function disabledCalendarNextMonthButton(date, reference, bounds) {
  if (!bounds) return false;
  var firstBound = new Date(bounds[0]);
  return !sameDayOrAfter(firstBound, reference) && !betweenDates(date, bounds);
};
var _getOutputFormat = function getOutputFormat(dates) {
  if (typeof dates === 'string' && (dates == null ? void 0 : dates.indexOf('T')) === -1) {
    return 'no timezone';
  }
  if (Array.isArray(dates)) {
    return _getOutputFormat(dates[0]);
  }
  return 'date timezone';
};
export { _getOutputFormat as getOutputFormat };
var millisecondsPerYear = 31557600000;

// when caller opts in to day hover styling, apply all state styles
// on CalendarDay instead of active state on CalendarDayButton
var CalendarDayButton = styled(Button).withConfig({
  displayName: "Calendar__CalendarDayButton",
  componentId: "sc-1chaf9i-0"
})(["", ""], function (props) {
  var _props$theme$calendar;
  return ((_props$theme$calendar = props.theme.calendar) == null || (_props$theme$calendar = _props$theme$calendar.day) == null || (_props$theme$calendar = _props$theme$calendar.hover) == null ? void 0 : _props$theme$calendar.background) && 'background: inherit;';
});
var CalendarDay = function CalendarDay(_ref) {
  var children = _ref.children,
    fill = _ref.fill,
    size = _ref.size,
    isInRange = _ref.isInRange,
    isSelected = _ref.isSelected,
    otherMonth = _ref.otherMonth,
    rangePosition = _ref.rangePosition,
    _ref$buttonProps = _ref.buttonProps,
    buttonProps = _ref$buttonProps === void 0 ? {} : _ref$buttonProps;
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var usingKeyboard = useKeyboard();
  return /*#__PURE__*/React.createElement(StyledDayContainer, {
    role: "gridcell",
    inRange: isInRange,
    isSelected: isSelected,
    rangePosition: rangePosition,
    sizeProp: size,
    fillContainer: fill
  }, /*#__PURE__*/React.createElement(CalendarDayButton, _extends({
    fill: fill,
    tabIndex: -1,
    plain: true
  }, buttonProps), function (_ref2) {
    var active = _ref2.active,
      hover = _ref2.hover;
    return /*#__PURE__*/React.createElement(StyledDay
    // only apply active styling when using keyboard
    // otherwise apply hover styling
    , _extends({
      active: usingKeyboard ? active : undefined,
      disabledProp: buttonProps.disabled,
      hover: hover,
      inRange: isInRange,
      isSelected: isSelected,
      otherMonth: otherMonth,
      sizeProp: size,
      fillContainer: fill
    }, passThemeFlag), children);
  }));
};
var CalendarCustomDay = function CalendarCustomDay(_ref3) {
  var children = _ref3.children,
    fill = _ref3.fill,
    size = _ref3.size,
    buttonProps = _ref3.buttonProps;
  if (!buttonProps) {
    return /*#__PURE__*/React.createElement(StyledDayContainer, {
      role: "gridcell",
      sizeProp: size,
      fillContainer: fill
    }, children);
  }
  return /*#__PURE__*/React.createElement(StyledDayContainer, {
    role: "gridcell",
    sizeProp: size,
    fillContainer: fill
  }, /*#__PURE__*/React.createElement(CalendarDayButton, _extends({
    fill: fill
  }, buttonProps), children));
};
var Calendar = /*#__PURE__*/forwardRef(function (_ref4, ref) {
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
    _ref4$showAdjacentDay = _ref4.showAdjacentDays,
    showAdjacentDays = _ref4$showAdjacentDay === void 0 ? true : _ref4$showAdjacentDay,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 'medium' : _ref4$size,
    timestampProp = _ref4.timestamp,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  var _useThemeValue2 = useThemeValue(),
    theme = _useThemeValue2.theme,
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;

  // when mousedown, we don't want to let Calendar set
  // active date to firstInMonth
  var _useState = useState(false),
    mouseDown = _useState[0],
    setMouseDown = _useState[1];
  var onMouseDown = function onMouseDown() {
    return setMouseDown(true);
  };
  var onMouseUp = function onMouseUp() {
    return setMouseDown(false);
  };
  useEffect(function () {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    return function () {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // set activeDate when caller changes it, allows us to change
  // it internally too
  var _useState2 = useState(dateProp && typeof dateProp === 'string' && range ? 'end' : 'start'),
    activeDate = _useState2[0],
    setActiveDate = _useState2[1];
  useEffect(function () {
    if (activeDateProp) setActiveDate(activeDateProp);
  }, [activeDateProp]);
  var _useState3 = useState(_normalizeInput(dateProp || datesProp)),
    value = _useState3[0],
    setValue = _useState3[1];
  useEffect(function () {
    var val = dateProp || datesProp;
    setValue(_normalizeInput(val));
  }, [dateProp, datesProp]);
  var _useState4 = useState(getReference(_normalizeInput(referenceProp), value)),
    reference = _useState4[0],
    setReference = _useState4[1];
  useEffect(function () {
    if (value) {
      setReference(getReference(_normalizeInput(referenceProp), value));
    }
  }, [referenceProp, value]);
  var _useState5 = useState(_getOutputFormat(dateProp || datesProp)),
    outputFormat = _useState5[0],
    setOutputFormat = _useState5[1];
  useEffect(function () {
    setOutputFormat(_getOutputFormat(dateProp || datesProp));
  }, [dateProp, datesProp]);

  // normalize bounds
  var _useState6 = useState(boundsProp),
    bounds = _useState6[0],
    setBounds = _useState6[1];
  useEffect(function () {
    if (boundsProp) setBounds(boundsProp);else setBounds(undefined);
  }, [boundsProp]);

  // calculate the bounds we display based on the reference
  var _useState7 = useState(buildDisplayBounds(reference, firstDayOfWeek)),
    displayBounds = _useState7[0],
    setDisplayBounds = _useState7[1];
  var _useState8 = useState(),
    targetDisplayBounds = _useState8[0],
    setTargetDisplayBounds = _useState8[1];
  var _useState9 = useState(),
    slide = _useState9[0],
    setSlide = _useState9[1];
  var _useState10 = useState(),
    animating = _useState10[0],
    setAnimating = _useState10[1];

  // When the reference changes, we need to update the displayBounds.
  // This is easy when we aren't animating. If we are animating,
  // we temporarily increase the displayBounds to be the union of the old
  // and new ones and set slide to drive the animation. We keep track
  // of where we are heading via targetDisplayBounds. When the animation
  // finishes, we prune displayBounds down to where we are headed and
  // clear the slide and targetDisplayBounds.
  useEffect(function () {
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
  useEffect(function () {
    // if the reference timezone has changed (e.g., controlled component),
    // both ends of the displayBounds should inherit that new timestamp
    if (targetDisplayBounds) {
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime() || targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        setDisplayBounds([targetDisplayBounds[0], targetDisplayBounds[1]]);
      }
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        // only animate if the duration is within a year
        if (displayBounds[0].getTime() - targetDisplayBounds[0].getTime() < millisecondsPerYear && daysApart(displayBounds[0], targetDisplayBounds[0])) {
          setSlide({
            direction: 'down',
            weeks: daysApart(displayBounds[0], targetDisplayBounds[0]) / 7
          });
          setAnimating(true);
        }
      } else if (targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (targetDisplayBounds[1].getTime() - displayBounds[1].getTime() < millisecondsPerYear && daysApart(targetDisplayBounds[1], displayBounds[1])) {
          setSlide({
            direction: 'up',
            weeks: daysApart(targetDisplayBounds[1], displayBounds[1]) / 7
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
  useEffect(function () {
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
  var previousMonth = useMemo(function () {
    return endOfMonth(subtractMonths(startOfMonth(reference), 1));
  }, [reference]);
  var nextMonth = useMemo(function () {
    return startOfMonth(addMonths(startOfMonth(reference), 1));
  }, [reference]);
  var daysRef = useRef();
  var _useState11 = useState(),
    focus = _useState11[0],
    setFocus = _useState11[1];
  var _useState12 = useState(),
    active = _useState12[0],
    setActive = _useState12[1];
  useEffect(function () {
    if (initialFocus === 'days') daysRef.current.focus();
  }, [initialFocus]);
  var handleReference = useCallback(function (nextReference) {
    setReference(nextReference);
    if (onReference) onReference(nextReference.toISOString());
  }, [onReference]);
  var changeReference = useCallback(function (nextReference) {
    if (betweenDates(nextReference, bounds)) handleReference(nextReference);
  }, [handleReference, bounds]);
  var changeCalendarMonth = function changeCalendarMonth(messageId, newMonth) {
    handleReference(newMonth);
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
  var handleRange = useCallback(function (selectedDate) {
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
  var selectDate = useCallback(function (selectedDate) {
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
  var _onClick = function onClick(selectedDate) {
    selectDate(selectedDate);
    announce("Selected " + getLocaleString(selectedDate, locale), 'assertive');
    // Chrome moves the focus indicator to this button. Set
    // the focus to the grid of days instead.
    daysRef.current.focus();
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
    return /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      align: "center"
    }, /*#__PURE__*/React.createElement(Header, {
      flex: true,
      pad: {
        horizontal: headingPadMap[size] || 'small'
      }
    }, (_theme$calendar$size = theme.calendar[size]) != null && _theme$calendar$size.title ? /*#__PURE__*/React.createElement(Text, theme.calendar[size].title, monthAndYear) : /*#__PURE__*/React.createElement(Heading, {
      level: headingLevel,
      size: size,
      margin: "none",
      overflowWrap: "normal"
    }, monthAndYear)), /*#__PURE__*/React.createElement(Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/React.createElement(Button, {
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
      icon: /*#__PURE__*/React.createElement(PreviousIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: disabledCalendarPreviousMonthButton(previousMonth, reference, bounds),
      onClick: function onClick() {
        return changeCalendarMonth('calendar.previousMove', previousMonth);
      }
    }), /*#__PURE__*/React.createElement(Button, {
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
      icon: /*#__PURE__*/React.createElement(NextIcon, {
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
      days.push(/*#__PURE__*/React.createElement(StyledDayContainer, {
        role: "gridcell",
        key: days.length,
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/React.createElement(StyledDay, {
        sizeProp: size,
        fillContainer: fill
      }, day.toLocaleDateString(locale, {
        weekday: 'narrow'
      }))));
      day = addDays(day, 1);
    }
    return /*#__PURE__*/React.createElement(StyledWeek, {
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
        weeks.push(/*#__PURE__*/React.createElement(StyledWeek, {
          role: "row",
          key: day.getTime(),
          fillContainer: fill
        }, days));
      }
      days = [];
    }
    var otherMonth = day.getMonth() !== reference.getMonth();
    if (!showAdjacentDays && otherMonth) {
      days.push(/*#__PURE__*/React.createElement(StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/React.createElement(StyledDay, {
        sizeProp: size,
        fillContainer: fill
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
      days.push(/*#__PURE__*/React.createElement(StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/React.createElement(StyledDay, {
        sizeProp: size,
        fillContainer: fill
      })));
    } else {
      var dateObject = day;
      // this.dayRefs[dateObject] = React.createRef();
      var selected = false;
      var inRange = false;
      var rangePosition;
      var _withinDates = withinDates(day, range ? normalizeRange(value, activeDate) : value),
        selectedState = _withinDates[0];
      if (selectedState === 2) {
        selected = true;
        var _withinDates2 = withinDates(day, range ? normalizeRange(value, activeDate) : value);
        rangePosition = _withinDates2[1];
      } else if (selectedState === 1) {
        inRange = true;
      }
      var dayDisabled = withinDates(day, _normalizeInput(disabled))[0] || bounds && !betweenDates(day, _normalizeInput(bounds));
      if (!firstDayInMonth && !dayDisabled && day.getMonth() === reference.getMonth()) {
        firstDayInMonth = dateObject;
      }
      if (!children) {
        days.push(/*#__PURE__*/React.createElement(CalendarDay, {
          key: day.getTime(),
          buttonProps: {
            a11yTitle: day.toDateString(),
            active: active && active.getTime() === day.getTime(),
            disabled: dayDisabled && !!dayDisabled,
            onClick: function onClick() {
              return _onClick(dateObject);
            },
            onMouseOver: function onMouseOver() {
              return setActive(dateObject);
            },
            onMouseOut: function onMouseOut() {
              return setActive(undefined);
            }
          },
          isInRange: inRange,
          isSelected: selected,
          otherMonth: day.getMonth() !== reference.getMonth(),
          rangePosition: rangePosition,
          size: size,
          fill: fill
        }, day.getDate()));
      } else {
        days.push(/*#__PURE__*/React.createElement(CalendarCustomDay, {
          key: day.getTime(),
          buttonProps: onSelect ? {
            a11yTitle: day.toDateString(),
            active: active && active.getTime() === day.getTime(),
            disabled: dayDisabled && !!dayDisabled,
            onClick: function onClick() {
              return _onClick(dateObject);
            },
            onMouseOver: function onMouseOver() {
              return setActive(dateObject);
            },
            onMouseOut: function onMouseOut() {
              return setActive(undefined);
            }
          } : null,
          size: size,
          fill: fill
        }, children({
          date: day,
          day: day.getDate(),
          isInRange: inRange,
          isSelected: selected
        })));
      }
    }
    day = addDays(day, 1);
  };
  while (day.getTime() < displayBounds[1].getTime()) {
    _loop();
  }
  weeks.push(/*#__PURE__*/React.createElement(StyledWeek
  // if a week contains only blank days, for screen reader accessibility
  // we don't want to set role="row"
  , {
    role: !blankWeek ? 'row' : undefined,
    key: day.getTime(),
    fillContainer: fill
  }, days));
  return /*#__PURE__*/React.createElement(StyledCalendar, _extends({
    ref: ref,
    sizeProp: size,
    fillContainer: fill
  }, passThemeFlag, rest), /*#__PURE__*/React.createElement(Box, {
    fill: fill
  }, header ? header({
    date: reference,
    locale: locale,
    onPreviousMonth: function onPreviousMonth() {
      changeReference(previousMonth);
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
    previousInBound: betweenDates(previousMonth, bounds),
    nextInBound: betweenDates(nextMonth, bounds)
  }) : renderCalendarHeader(previousMonth, nextMonth), /*#__PURE__*/React.createElement(Box, {
    fill: true,
    role: "grid"
  }, daysOfWeek && renderDaysOfWeek(), /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: function onEnter() {
      return active !== undefined ? _onClick(active) : undefined;
    },
    onSpace: function onSpace(event) {
      event.preventDefault();
      if (active !== undefined) {
        _onClick(active);
      }
    },
    onUp: function onUp(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll
      setActive(addDays(active, -7));
      if (!betweenDates(addDays(active, -7), displayBounds)) {
        changeReference(addDays(active, -7));
      }
    },
    onDown: function onDown(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll
      setActive(addDays(active, 7));
      if (!betweenDates(addDays(active, 7), displayBounds)) {
        changeReference(active);
      }
    },
    onLeft: function onLeft() {
      setActive(addDays(active, -1));
      if (!betweenDates(addDays(active, -1), displayBounds)) {
        changeReference(active);
      }
    },
    onRight: function onRight() {
      setActive(addDays(active, 1));
      if (!betweenDates(addDays(active, 2), displayBounds)) {
        changeReference(active);
      }
    }
  }, /*#__PURE__*/React.createElement(StyledWeeksContainer, _extends({
    tabIndex: 0,
    role: "rowgroup",
    "aria-label": reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    }) + "; " + currentlySelectedString(value, locale),
    ref: daysRef,
    sizeProp: size,
    fillContainer: fill,
    focus: focus,
    onFocus: function onFocus() {
      setFocus(true);
      // caller focused onto Calendar via keyboard
      if (!mouseDown) {
        setActive(new Date(firstDayInMonth));
      }
    },
    onBlur: function onBlur() {
      setFocus(false);
      setActive(undefined);
    }
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledWeeks, _extends({
    slide: slide,
    sizeProp: size,
    fillContainer: fill
  }, passThemeFlag), weeks))))));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = CalendarPropTypes;
export { Calendar };