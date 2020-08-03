function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';
import { StyledCalendar, StyledDay, StyledDayContainer, StyledWeek, StyledWeeks, StyledWeeksContainer } from './StyledCalendar';
import { addDays, addMonths, betweenDates, daysApart, endOfMonth, startOfMonth, subtractDays, subtractMonths, withinDates } from './utils';
var headingPadMap = {
  small: 'xsmall',
  medium: 'small',
  large: 'medium'
};

var normalizeReference = function normalizeReference(reference, date, dates) {
  var normalizedReference;

  if (reference) {
    normalizedReference = new Date(reference);
  } else if (date) {
    normalizedReference = new Date(date);
  } else if (dates && dates.length > 0) {
    if (typeof dates[0] === 'string') {
      normalizedReference = new Date(dates[0]);
    } else if (Array.isArray(dates[0])) {
      normalizedReference = new Date(dates[0][0]);
    } else {
      normalizedReference = new Date();
      normalizedReference.setHours(0, 0, 0, 0);
    }
  } else {
    normalizedReference = new Date();
    normalizedReference.setHours(0, 0, 0, 0);
  }

  return normalizedReference;
};

var buildDisplayBounds = function buildDisplayBounds(reference, firstDayOfWeek) {
  var start = new Date(reference);
  start.setDate(1); // first of month
  // In case Sunday is the first day of the month, and the user asked for Monday
  // to be the first day of the week, then we need to include Sunday and six
  // days prior.

  start = start.getDay() === 0 && firstDayOfWeek === 1 ? start = subtractDays(start, 6) : // beginning of week
  start = subtractDays(start, start.getDay() - firstDayOfWeek);
  var end = addDays(start, 7 * 5 + 7); // 5 weeks to end of week

  return [start, end];
};

var millisecondsPerYear = 31557600000;
var Calendar = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? true : _ref$animate,
      validBounds = _ref.bounds,
      dateProp = _ref.date,
      datesProp = _ref.dates,
      daysOfWeek = _ref.daysOfWeek,
      disabled = _ref.disabled,
      _ref$firstDayOfWeek = _ref.firstDayOfWeek,
      firstDayOfWeek = _ref$firstDayOfWeek === void 0 ? 0 : _ref$firstDayOfWeek,
      header = _ref.header,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'en-US' : _ref$locale,
      onReference = _ref.onReference,
      onSelect = _ref.onSelect,
      range = _ref.range,
      referenceProp = _ref.reference,
      _ref$showAdjacentDays = _ref.showAdjacentDays,
      showAdjacentDays = _ref$showAdjacentDays === void 0 ? true : _ref$showAdjacentDays,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      rest = _objectWithoutPropertiesLoose(_ref, ["animate", "bounds", "date", "dates", "daysOfWeek", "disabled", "firstDayOfWeek", "header", "locale", "onReference", "onSelect", "range", "reference", "showAdjacentDays", "size"]);

  var theme = useContext(ThemeContext) || defaultProps.theme; // set date when caller changes it, allows us to change it internally too

  var _useState = useState(dateProp),
      date = _useState[0],
      setDate = _useState[1];

  useEffect(function () {
    return setDate(dateProp);
  }, [dateProp]); // set dates when caller changes it, allows us to change it internally too

  var _useState2 = useState(datesProp),
      dates = _useState2[0],
      setDates = _useState2[1];

  useEffect(function () {
    return setDates(datesProp);
  }, [datesProp]); // set reference based on what the caller passed or date/dates.

  var _useState3 = useState(normalizeReference(referenceProp, date, dates)),
      reference = _useState3[0],
      setReference = _useState3[1];

  useEffect(function () {
    return setReference(normalizeReference(referenceProp, dateProp, datesProp));
  }, [dateProp, datesProp, referenceProp]); // calculate the bounds we display based on the reference

  var _useState4 = useState(buildDisplayBounds(reference, firstDayOfWeek)),
      displayBounds = _useState4[0],
      setDisplayBounds = _useState4[1];

  var _useState5 = useState(),
      targetDisplayBounds = _useState5[0],
      setTargetDisplayBounds = _useState5[1];

  var _useState6 = useState(),
      slide = _useState6[0],
      setSlide = _useState6[1]; // When the reference changes, we need to update the displayBounds.
  // This is easy when we aren't animating. If we are animating,
  // we temporarily increase the displayBounds to be the union of the old
  // and new ones and set slide to drive the animation. We keep track
  // of where we are heading via targetDisplayBounds. When the animation
  // finishes, we prune displayBounds down to where we are headed and
  // clear the slide and targetDisplayBounds.


  useEffect(function () {
    var nextDisplayBounds = buildDisplayBounds(reference, firstDayOfWeek);

    if (!animate) {
      setDisplayBounds(nextDisplayBounds);
    } else {
      setTargetDisplayBounds(nextDisplayBounds);
    }
  }, [animate, firstDayOfWeek, reference]);
  useEffect(function () {
    if (targetDisplayBounds) {
      var animating;

      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        // only animate if the duration is within a year
        if (displayBounds[0].getTime() - targetDisplayBounds[0].getTime() < millisecondsPerYear) {
          setDisplayBounds([targetDisplayBounds[0], displayBounds[1]]);
          setSlide({
            direction: 'down',
            weeks: daysApart(displayBounds[0], targetDisplayBounds[0]) / 7
          });
          animating = true;
        }
      } else if (targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (targetDisplayBounds[1].getTime() - displayBounds[1].getTime() < millisecondsPerYear) {
          setDisplayBounds([displayBounds[0], targetDisplayBounds[1]]);
          setSlide({
            direction: 'up',
            weeks: daysApart(targetDisplayBounds[1], displayBounds[1]) / 7
          });
          animating = true;
        }
      }

      if (animating) {
        // Wait for animation to finish before cleaning up.
        var timer = setTimeout(function () {
          setDisplayBounds(targetDisplayBounds);
          setTargetDisplayBounds(undefined);
          setSlide(undefined);
        }, 400 // Empirically determined.
        );
        return function () {
          return clearTimeout(timer);
        };
      }

      return undefined;
    }

    setSlide(undefined);
    return undefined;
  }, [displayBounds, targetDisplayBounds]); // We have to deal with reference being the end of a month with more
  // days than the month we are changing to. So, we always set reference
  // to the first of the month before changing the month.

  var previousMonth = useMemo(function () {
    return endOfMonth(subtractMonths(startOfMonth(reference), 1));
  }, [reference]);
  var nextMonth = useMemo(function () {
    return startOfMonth(addMonths(startOfMonth(reference), 1));
  }, [reference]);
  var daysRef = useRef();

  var _useState7 = useState(),
      focus = _useState7[0],
      setFocus = _useState7[1];

  var _useState8 = useState(),
      active = _useState8[0],
      setActive = _useState8[1]; // when working on a range, remember the last selected date so we know
  // how to handle subsequent date selection


  var _useState9 = useState(),
      lastSelectedDate = _useState9[0],
      setLastSelectedDate = _useState9[1];

  var changeReference = useCallback(function (nextReference) {
    if (betweenDates(nextReference, validBounds)) {
      setReference(nextReference);
      if (onReference) onReference(nextReference.toISOString());
    }
  }, [onReference, validBounds]);
  var selectDate = useCallback(function (selectedDate) {
    var nextDates;
    var nextDate;

    if (!range) {
      nextDate = selectedDate;
    } else if (!dates) {
      if (!date) {
        nextDate = selectedDate;
      } else {
        var priorDate = new Date(date);
        var selDate = new Date(selectedDate);

        if (priorDate.getTime() < selDate.getTime()) {
          nextDates = [[date, selectedDate]];
          nextDate = undefined;
        } else if (priorDate.getTime() > selDate.getTime()) {
          nextDates = [[selectedDate, date]];
          nextDate = undefined;
        } else {
          nextDate = undefined;
        }
      }
    } else {
      // have dates
      var priorDates = dates[0].map(function (d) {
        return new Date(d);
      });
      var previousDate = new Date(lastSelectedDate || dates[0][0]);

      var _selDate = new Date(selectedDate);

      if (_selDate.getTime() === priorDates[0].getTime()) {
        var _dates$ = dates[0];
        nextDate = _dates$[1];
        nextDates = undefined;
      } else if (_selDate.getTime() === priorDates[1].getTime()) {
        var _dates$2 = dates[0];
        nextDate = _dates$2[0];
        nextDates = undefined;
      } else if (_selDate.getTime() === previousDate.getTime()) {
        if (_selDate.getTime() < priorDates[0].getTime()) {
          nextDates = [[selectedDate, dates[0][1]]];
        } else if (_selDate.getTime() > priorDates[0].getTime()) {
          nextDates = [[dates[0][0], selectedDate]];
        }
      } else if (_selDate.getTime() < previousDate.getTime()) {
        if (_selDate.getTime() < priorDates[0].getTime()) {
          nextDates = [[selectedDate, dates[0][1]]];
        } else if (_selDate.getTime() > priorDates[0].getTime()) {
          nextDates = [[dates[0][0], selectedDate]];
        }
      } else if (_selDate.getTime() > previousDate.getTime()) {
        if (_selDate.getTime() > priorDates[1].getTime()) {
          nextDates = [[dates[0][0], selectedDate]];
        } else if (_selDate.getTime() < priorDates[1].getTime()) {
          nextDates = [[selectedDate, dates[0][1]]];
        }
      }
    }

    setDates(nextDates);
    if (!dates) setDate(nextDate);
    setActive(new Date(selectedDate));
    setLastSelectedDate(selectedDate);
    if (onSelect) onSelect(nextDates || nextDate);
  }, [date, dates, lastSelectedDate, onSelect, range]);

  var renderCalendarHeader = function renderCalendarHeader() {
    var PreviousIcon = size === 'small' ? theme.calendar.icons.small.previous : theme.calendar.icons.previous;
    var NextIcon = size === 'small' ? theme.calendar.icons.small.next : theme.calendar.icons.next;
    return /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      align: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      flex: true,
      pad: {
        horizontal: headingPadMap[size] || 'small'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      level: size === 'small' ? theme.calendar.heading && theme.calendar.heading.level || 4 : (theme.calendar.heading && theme.calendar.heading.level || 4) - 1,
      size: size,
      margin: "none"
    }, reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    }))), /*#__PURE__*/React.createElement(Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/React.createElement(Button, {
      a11yTitle: previousMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }),
      icon: /*#__PURE__*/React.createElement(PreviousIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: !betweenDates(previousMonth, validBounds),
      onClick: function onClick() {
        return changeReference(previousMonth);
      }
    }), /*#__PURE__*/React.createElement(Button, {
      a11yTitle: nextMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }),
      icon: /*#__PURE__*/React.createElement(NextIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: !betweenDates(nextMonth, validBounds),
      onClick: function onClick() {
        return changeReference(nextMonth);
      }
    })));
  };

  var renderDaysOfWeek = function renderDaysOfWeek() {
    var day = new Date(displayBounds[0]);
    var days = [];

    while (days.length < 7) {
      days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
        key: days.length,
        sizeProp: size
      }, /*#__PURE__*/React.createElement(StyledDay, {
        otherMonth: true,
        sizeProp: size
      }, day.toLocaleDateString(locale, {
        weekday: 'narrow'
      }))));
      day = addDays(day, 1);
    }

    return /*#__PURE__*/React.createElement(StyledWeek, null, days);
  };

  var weeks = [];
  var day = new Date(displayBounds[0]);
  var days;
  var firstDayInMonth;

  while (day.getTime() < displayBounds[1].getTime()) {
    if (day.getDay() === firstDayOfWeek) {
      if (days) {
        weeks.push( /*#__PURE__*/React.createElement(StyledWeek, {
          key: day.getTime()
        }, days));
      }

      days = [];
    }

    var otherMonth = day.getMonth() !== reference.getMonth();

    if (!showAdjacentDays && otherMonth) {
      days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size
      }, /*#__PURE__*/React.createElement(StyledDay, {
        sizeProp: size
      })));
    } else {
      (function () {
        var dateString = day.toISOString(); // this.dayRefs[dateString] = React.createRef();

        var selected = false;
        var inRange = false;
        var selectedState = withinDates(day, date || dates);

        if (selectedState === 2) {
          selected = true;
        } else if (selectedState === 1) {
          inRange = true;
        }

        var dayDisabled = withinDates(day, disabled) || validBounds && !betweenDates(day, validBounds);

        if (!firstDayInMonth && !dayDisabled && day.getMonth() === reference.getMonth()) {
          firstDayInMonth = dateString;
        }

        days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
          key: day.getTime(),
          sizeProp: size
        }, /*#__PURE__*/React.createElement(Button, {
          a11yTitle: day.toDateString(),
          plain: true,
          tabIndex: -1,
          active: active && active.getTime() === day.getTime(),
          disabled: dayDisabled && !!dayDisabled,
          onClick: function onClick() {
            selectDate(dateString); // Chrome moves the focus indicator to this button. Set
            // the focus to the grid of days instead.

            daysRef.current.focus();
          },
          onMouseOver: function onMouseOver() {
            return setActive(new Date(dateString));
          },
          onMouseOut: function onMouseOut() {
            return setActive(undefined);
          },
          onFocus: function onFocus() {},
          onBlur: function onBlur() {}
        }, /*#__PURE__*/React.createElement(StyledDay, {
          inRange: inRange,
          otherMonth: day.getMonth() !== reference.getMonth(),
          isSelected: selected,
          sizeProp: size
        }, day.getDate()))));
      })();
    }

    day = addDays(day, 1);
  }

  weeks.push( /*#__PURE__*/React.createElement(StyledWeek, {
    key: day.getTime()
  }, days));
  return /*#__PURE__*/React.createElement(StyledCalendar, _extends({
    ref: ref,
    sizeProp: size
  }, rest), /*#__PURE__*/React.createElement(Box, null, header ? header({
    date: reference,
    locale: locale,
    onPreviousMonth: function onPreviousMonth() {
      return changeReference(previousMonth);
    },
    onNextMonth: function onNextMonth() {
      return changeReference(nextMonth);
    },
    previousInBound: betweenDates(previousMonth, validBounds),
    nextInBound: betweenDates(nextMonth, validBounds)
  }) : renderCalendarHeader(previousMonth, nextMonth), daysOfWeek && renderDaysOfWeek(), /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: function onEnter() {
      return selectDate(active.toISOString());
    },
    onUp: function onUp(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll

      setActive(addDays(active, -7));
    },
    onDown: function onDown(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll

      setActive(addDays(active, 7));
    },
    onLeft: function onLeft() {
      return active && setActive(addDays(active, -1));
    },
    onRight: function onRight() {
      return active && setActive(addDays(active, 1));
    }
  }, /*#__PURE__*/React.createElement(StyledWeeksContainer, {
    ref: daysRef,
    sizeProp: size,
    tabIndex: 0,
    focus: focus,
    onFocus: function onFocus() {
      setFocus(true);

      if (date && betweenDates(new Date(date), displayBounds)) {
        setActive(new Date(date));
      } else {
        setActive(new Date(firstDayInMonth));
      }
    },
    onBlur: function onBlur() {
      setFocus(false);
      setActive(undefined);
    }
  }, /*#__PURE__*/React.createElement(StyledWeeks, {
    slide: slide,
    sizeProp: size
  }, weeks)))));
});
Calendar.displayName = 'Calendar';
var CalendarDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CalendarDoc = require('./doc').doc(Calendar);
}

var CalendarWrapper = CalendarDoc || Calendar;
export { CalendarWrapper as Calendar };