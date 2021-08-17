var _excluded = ["activeDate", "animate", "bounds", "children", "date", "dates", "daysOfWeek", "disabled", "fill", "firstDayOfWeek", "header", "locale", "messages", "onReference", "onSelect", "range", "reference", "showAdjacentDays", "size"];

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';
import { StyledCalendar, StyledDay, StyledDayContainer, StyledWeek, StyledWeeks, StyledWeeksContainer } from './StyledCalendar';
import { addDays, addMonths, betweenDates, daysApart, endOfMonth, formatToLocalYYYYMMDD, localTimezoneToUTC, startOfMonth, subtractDays, subtractMonths, withinDates } from './utils';
import { CalendarPropTypes } from './propTypes';
var headingPadMap = {
  small: 'xsmall',
  medium: 'small',
  large: 'medium'
};
var activeDates = {
  start: 'start',
  end: 'end'
};
var timeStamp = new RegExp(/T.*/);

var normalizeForTimezone = function normalizeForTimezone(date, refDate) {
  if (!date) return undefined;
  return (!timeStamp.test(refDate || date) ? localTimezoneToUTC(new Date(date)) : new Date(date)).toISOString();
};

var normalizeReference = function normalizeReference(reference, date, dates) {
  var normalizedReference;

  if (reference) {
    normalizedReference = new Date(reference);
  } else if (date) {
    if (typeof date === 'string') {
      normalizedReference = new Date(date);
    } else if (Array.isArray(date)) {
      if (typeof date[0] === 'string') {
        normalizedReference = new Date(date[0]);
      } else if (Array.isArray(date[0])) {
        normalizedReference = new Date(date[0][0] ? date[0][0] : date[0][1]);
      } else {
        normalizedReference = new Date();
        normalizedReference.setHours(0, 0, 0, 0);
      }
    }
  } else if (dates && dates.length > 0) {
    if (typeof dates[0] === 'string') {
      normalizedReference = new Date(dates[0]);
    } else if (Array.isArray(dates[0])) {
      normalizedReference = new Date(dates[0][0] ? dates[0][0] : dates[0][1]);
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

  start = start.getDay() === 0 && firstDayOfWeek === 1 ? start = subtractDays(start, 6) : start = subtractDays(start, start.getDay() - firstDayOfWeek);
  var end = addDays(start, 7 * 5 + 7); // 5 weeks to end of week

  return [start, end];
};

var millisecondsPerYear = 31557600000;

var CalendarDayButton = function CalendarDayButton(props) {
  return /*#__PURE__*/React.createElement(Button, _extends({
    tabIndex: -1,
    plain: true
  }, props));
};

var CalendarDay = function CalendarDay(_ref) {
  var children = _ref.children,
      fill = _ref.fill,
      size = _ref.size,
      isInRange = _ref.isInRange,
      isSelected = _ref.isSelected,
      otherMonth = _ref.otherMonth,
      _ref$buttonProps = _ref.buttonProps,
      buttonProps = _ref$buttonProps === void 0 ? {} : _ref$buttonProps;
  return /*#__PURE__*/React.createElement(StyledDayContainer, {
    role: "gridcell",
    sizeProp: size,
    fillContainer: fill
  }, /*#__PURE__*/React.createElement(CalendarDayButton, _extends({
    fill: fill
  }, buttonProps), /*#__PURE__*/React.createElement(StyledDay, {
    disabledProp: buttonProps.disabled,
    inRange: isInRange,
    otherMonth: otherMonth,
    isSelected: isSelected,
    sizeProp: size,
    fillContainer: fill
  }, children)));
};

var CalendarCustomDay = function CalendarCustomDay(_ref2) {
  var children = _ref2.children,
      fill = _ref2.fill,
      size = _ref2.size,
      buttonProps = _ref2.buttonProps;

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

var Calendar = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var activeDateProp = _ref3.activeDate,
      _ref3$animate = _ref3.animate,
      animate = _ref3$animate === void 0 ? true : _ref3$animate,
      boundsProp = _ref3.bounds,
      children = _ref3.children,
      dateProp = _ref3.date,
      datesProp = _ref3.dates,
      daysOfWeek = _ref3.daysOfWeek,
      disabled = _ref3.disabled,
      fill = _ref3.fill,
      _ref3$firstDayOfWeek = _ref3.firstDayOfWeek,
      firstDayOfWeek = _ref3$firstDayOfWeek === void 0 ? 0 : _ref3$firstDayOfWeek,
      header = _ref3.header,
      _ref3$locale = _ref3.locale,
      locale = _ref3$locale === void 0 ? 'en-US' : _ref3$locale,
      messages = _ref3.messages,
      onReference = _ref3.onReference,
      onSelect = _ref3.onSelect,
      range = _ref3.range,
      referenceProp = _ref3.reference,
      _ref3$showAdjacentDay = _ref3.showAdjacentDays,
      showAdjacentDays = _ref3$showAdjacentDay === void 0 ? true : _ref3$showAdjacentDay,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 'medium' : _ref3$size,
      rest = _objectWithoutPropertiesLoose(_ref3, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var announce = useContext(AnnounceContext);

  var _useContext = useContext(MessageContext),
      format = _useContext.format; // set activeDate when caller changes it, allows us to change
  // it internally too


  var _useState = useState(dateProp && typeof dateProp === 'string' && range ? activeDates.end : activeDates.start),
      activeDate = _useState[0],
      setActiveDate = _useState[1];

  useEffect(function () {
    if (activeDateProp) setActiveDate(activeDateProp);
  }, [activeDateProp]); // function that runs inside the useEffect for date and dates

  var normalizeDate = function normalizeDate(dateValue) {
    // convert values to UTC based on if date is string or array
    if (typeof dateValue === 'string') {
      return normalizeForTimezone(dateValue);
    }

    if (Array.isArray(dateValue)) {
      if (Array.isArray(dateValue[0])) {
        var from;
        var to;

        var _dateValue$0$map = dateValue[0].map(function (day) {
          return day ? new Date(day) : undefined;
        });

        from = _dateValue$0$map[0];
        to = _dateValue$0$map[1];
        if (from) from = normalizeForTimezone(from, dateValue[0][0]);
        if (to) to = normalizeForTimezone(to, dateValue[0][0]);
        return [[from, to]];
      }

      var dateArray = [];
      dateValue.forEach(function (d) {
        if (Array.isArray(d)) {
          var _from;

          var _to;

          var _d$map = d.map(function (day) {
            return new Date(day);
          });

          _from = _d$map[0];
          _to = _d$map[1];
          _from = normalizeForTimezone(_from, d[0]);
          _to = normalizeForTimezone(_to, d[0]);
          dateArray.push([_from, _to]);
        } else {
          dateArray.push(normalizeForTimezone(d));
        }
      });
      return dateArray;
    }

    return undefined;
  }; // set date when caller changes it, allows us to change it internally too


  var _useState2 = useState(dateProp),
      date = _useState2[0],
      setDate = _useState2[1];

  useEffect(function () {
    setDate(normalizeDate(dateProp));
  }, [dateProp]); // set dates when caller changes it, allows us to change it internally too

  var _useState3 = useState(datesProp),
      dates = _useState3[0],
      setDates = _useState3[1];

  useEffect(function () {
    setDates(normalizeDate(datesProp));
  }, [datesProp]); // set reference based on what the caller passed or date/dates.

  var _useState4 = useState(normalizeReference(referenceProp, date, dates)),
      reference = _useState4[0],
      setReference = _useState4[1];

  useEffect(function () {
    return setReference(normalizeReference(referenceProp, dateProp, datesProp));
  }, [dateProp, datesProp, referenceProp]); // normalize bounds

  var _useState5 = useState(boundsProp ? boundsProp.map(function (b) {
    return normalizeForTimezone(b);
  }) : undefined),
      bounds = _useState5[0],
      setBounds = _useState5[1];

  useEffect(function () {
    if (boundsProp) setBounds(boundsProp.map(function (b) {
      return normalizeForTimezone(b);
    }));else setBounds(undefined);
  }, [boundsProp]); // calculate the bounds we display based on the reference

  var _useState6 = useState(buildDisplayBounds(reference, firstDayOfWeek)),
      displayBounds = _useState6[0],
      setDisplayBounds = _useState6[1];

  var _useState7 = useState(),
      targetDisplayBounds = _useState7[0],
      setTargetDisplayBounds = _useState7[1];

  var _useState8 = useState(),
      slide = _useState8[0],
      setSlide = _useState8[1];

  var _useState9 = useState(),
      animating = _useState9[0],
      setAnimating = _useState9[1]; // When the reference changes, we need to update the displayBounds.
  // This is easy when we aren't animating. If we are animating,
  // we temporarily increase the displayBounds to be the union of the old
  // and new ones and set slide to drive the animation. We keep track
  // of where we are heading via targetDisplayBounds. When the animation
  // finishes, we prune displayBounds down to where we are headed and
  // clear the slide and targetDisplayBounds.


  useEffect(function () {
    var nextDisplayBounds = buildDisplayBounds(reference, firstDayOfWeek); // Checks if the difference between the current and next DisplayBounds is
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
    if (targetDisplayBounds) {
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        // only animate if the duration is within a year
        if (displayBounds[0].getTime() - targetDisplayBounds[0].getTime() < millisecondsPerYear) {
          setDisplayBounds([targetDisplayBounds[0], displayBounds[1]]);
          setSlide({
            direction: 'down',
            weeks: daysApart(displayBounds[0], targetDisplayBounds[0]) / 7
          });
          setAnimating(true);
        }
      } else if (targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (targetDisplayBounds[1].getTime() - displayBounds[1].getTime() < millisecondsPerYear) {
          setDisplayBounds([displayBounds[0], targetDisplayBounds[1]]);
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
  }, [animating, displayBounds, targetDisplayBounds]); // Last step in updating the displayBounds. Allows for pruning
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
  }, [animating, targetDisplayBounds]); // We have to deal with reference being the end of a month with more
  // days than the month we are changing to. So, we always set reference
  // to the first of the month before changing the month.

  var previousMonth = useMemo(function () {
    return endOfMonth(subtractMonths(startOfMonth(reference), 1));
  }, [reference]);
  var nextMonth = useMemo(function () {
    return startOfMonth(addMonths(startOfMonth(reference), 1));
  }, [reference]);
  var daysRef = useRef();

  var _useState10 = useState(),
      focus = _useState10[0],
      setFocus = _useState10[1];

  var _useState11 = useState(),
      active = _useState11[0],
      setActive = _useState11[1];

  var changeReference = useCallback(function (nextReference) {
    if (betweenDates(nextReference, bounds)) {
      setReference(nextReference);
      if (onReference) onReference(nextReference.toISOString());
    }
  }, [onReference, bounds]);
  var selectDate = useCallback(function (selectedDate) {
    var nextDates;
    var nextDate; // output date with no timestamp if that's how user provided it

    var adjustedDate;

    if (!range) {
      nextDate = selectedDate;

      if (datesProp) {
        datesProp.forEach(function (d) {
          if (!timeStamp.test(d)) {
            adjustedDate = formatToLocalYYYYMMDD(nextDate);

            if (d === adjustedDate) {
              nextDate = undefined;
            } else {
              adjustedDate = undefined;
            }
          }
        });
      } else if (typeof dateProp === 'string') {
        if (!timeStamp.test(dateProp)) {
          adjustedDate = formatToLocalYYYYMMDD(selectedDate);

          if (dateProp === adjustedDate) {
            nextDate = undefined;
          } else {
            adjustedDate = undefined;
          }
        }
      } else if (Array.isArray(dateProp)) {
        dateProp.forEach(function (d) {
          if (!timeStamp.test(d)) {
            adjustedDate = formatToLocalYYYYMMDD(nextDate);

            if (d === adjustedDate) {
              nextDate = undefined;
            } else {
              adjustedDate = undefined;
            }
          }
        });
      } else {
        adjustedDate = undefined;
      }
    } // everything down is a range
    else if (!dates && !Array.isArray(date)) {
      // if user supplies date, convert this into dates
      if (date) {
        var priorDate = new Date(date);
        var selDate = new Date(selectedDate);

        if (activeDate === activeDates.start) {
          if (selDate.getTime() > priorDate.getTime()) {
            nextDates = [[selectedDate, undefined]];
          } else {
            nextDates = [[selectedDate, date]];
          }

          setActiveDate(activeDates.end);
          if (activeDateProp) setActiveDate(activeDateProp);
        } else if (activeDate === activeDates.end) {
          if (selDate.getTime() < priorDate.getTime()) {
            nextDates = [[selectedDate, undefined]];
            setActiveDate(activeDates.end);
          } else {
            nextDates = [[date, selectedDate]];
            setActiveDate(activeDates.start);
          }

          if (activeDateProp) setActiveDate(activeDateProp);
        }
      } else if (activeDate === activeDates.start) {
        nextDates = [[selectedDate, undefined]];
        setActiveDate(activeDates.end);
      } else if (activeDate === activeDates.end) {
        nextDates = [[undefined, selectedDate]];
      }

      if (activeDateProp) setActiveDate(activeDateProp);
    } else if (dates || date) {
      var handleSelection = function handleSelection(dateValue) {
        var priorDates = dateValue[0].map(function (d) {
          return new Date(d);
        });
        var selDate = new Date(selectedDate);

        if (selDate.getTime() === priorDates[0].getTime()) {
          nextDates = [[undefined, dateValue[0][1]]];
          setActiveDate(activeDates.start);
        } else if (selDate.getTime() === priorDates[1].getTime()) {
          nextDates = [[dateValue[0][0], undefined]];
          setActiveDate(activeDates.end);
          if (activeDateProp) setActiveDate(activeDateProp);
        } else if (activeDate === activeDates.start) {
          if (selDate.getTime() > priorDates[1].getTime()) {
            nextDates = [[selectedDate, undefined]];
          } else {
            nextDates = [[selectedDate, dateValue[0][1]]];
          }

          setActiveDate(activeDates.end);
          if (activeDateProp) setActiveDate(activeDateProp);
        } else if (activeDate === activeDates.end) {
          if (selDate.getTime() < priorDates[0].getTime()) {
            nextDates = [[selectedDate, undefined]];
            setActiveDate(activeDates.end);
          } else {
            nextDates = [[dateValue[0][0], selectedDate]];
            setActiveDate(activeDates.start);
          }

          if (activeDateProp) setActiveDate(activeDateProp);
        } // cleanup


        if (!nextDates[0][0] && !nextDates[0][1]) nextDates = undefined;
      }; // have dates


      if (dates) {
        handleSelection(dates);
      } else if (date && Array.isArray(date)) {
        handleSelection(date);
      }
    }

    setDates(nextDates);

    if (date && typeof date === 'string') {
      setDate(nextDate);
    } else if (date && Array.isArray(date)) {
      setDate(nextDates);
    }

    setActive(new Date(selectedDate));

    if (onSelect) {
      var adjustedDates;

      if (nextDates && Array.isArray(nextDates[0]) && (!nextDates[0][0] || !nextDates[0][1]) && range === true) {
        // return string for backwards compatibility
        var _nextDates$0$filter = nextDates[0].filter(function (d) {
          return d;
        });

        adjustedDates = _nextDates$0$filter[0];
      } else {
        adjustedDates = nextDates;
      }

      onSelect(adjustedDates || adjustedDate || nextDate);
    }
  }, [activeDate, activeDateProp, date, dateProp, dates, datesProp, onSelect, range]);

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
      disabled: !betweenDates(previousMonth, bounds),
      onClick: function onClick() {
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
      }
    }), /*#__PURE__*/React.createElement(Button, {
      a11yTitle: nextMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }),
      icon: /*#__PURE__*/React.createElement(NextIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: !betweenDates(nextMonth, bounds),
      onClick: function onClick() {
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
      }
    })));
  };

  var renderDaysOfWeek = function renderDaysOfWeek() {
    var day = new Date(displayBounds[0]);
    var days = [];

    while (days.length < 7) {
      days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
        role: "gridcell",
        key: days.length,
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/React.createElement(StyledDay, {
        otherMonth: true,
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

  while (day.getTime() < displayBounds[1].getTime()) {
    if (day.getDay() === firstDayOfWeek) {
      if (days) {
        weeks.push( /*#__PURE__*/React.createElement(StyledWeek, {
          role: "row",
          key: day.getTime(),
          fillContainer: fill
        }, days));
      }

      days = [];
    }

    var otherMonth = day.getMonth() !== reference.getMonth();

    if (!showAdjacentDays && otherMonth) {
      days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
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
      days.push( /*#__PURE__*/React.createElement(StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/React.createElement(StyledDay, {
        sizeProp: size,
        fillContainer: fill
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

        var dayDisabled = withinDates(day, disabled) || bounds && !betweenDates(day, bounds);

        if (!firstDayInMonth && !dayDisabled && day.getMonth() === reference.getMonth()) {
          firstDayInMonth = dateString;
        }

        if (!children) {
          days.push( /*#__PURE__*/React.createElement(CalendarDay, {
            key: day.getTime(),
            buttonProps: {
              a11yTitle: day.toDateString(),
              active: active && active.getTime() === day.getTime(),
              disabled: dayDisabled && !!dayDisabled,
              onClick: function onClick() {
                selectDate(dateString);
                announce("Selected " + formatToLocalYYYYMMDD(dateString), 'assertive'); // Chrome moves the focus indicator to this button. Set
                // the focus to the grid of days instead.

                daysRef.current.focus();
              },
              onMouseOver: function onMouseOver() {
                return setActive(new Date(dateString));
              },
              onMouseOut: function onMouseOut() {
                return setActive(undefined);
              }
            },
            isInRange: inRange,
            isSelected: selected,
            otherMonth: day.getMonth() !== reference.getMonth(),
            size: size,
            fill: fill
          }, day.getDate()));
        } else {
          days.push( /*#__PURE__*/React.createElement(CalendarCustomDay, {
            key: day.getTime(),
            buttonProps: onSelect ? {
              a11yTitle: day.toDateString(),
              active: active && active.getTime() === day.getTime(),
              disabled: dayDisabled && !!dayDisabled,
              onClick: function onClick() {
                selectDate(dateString);
                announce("Selected \n                          " + formatToLocalYYYYMMDD(dateString), 'assertive'); // Chrome moves the focus indicator to this button. Set
                // the focus to the grid of days instead.

                daysRef.current.focus();
              },
              onMouseOver: function onMouseOver() {
                return setActive(new Date(dateString));
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
      })();
    }

    day = addDays(day, 1);
  }

  weeks.push( /*#__PURE__*/React.createElement(StyledWeek // if a week contains only blank days, for screen reader accessibility
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
  }, rest), /*#__PURE__*/React.createElement(Box, {
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
  }) : renderCalendarHeader(previousMonth, nextMonth), daysOfWeek && renderDaysOfWeek(), /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: function onEnter() {
      return active !== undefined ? selectDate(active.toISOString()) : undefined;
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
    tabIndex: 0,
    role: "grid",
    "aria-label": reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    }),
    ref: daysRef,
    sizeProp: size,
    fillContainer: fill,
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
    sizeProp: size,
    fillContainer: fill
  }, weeks)))));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = CalendarPropTypes;
export { Calendar };