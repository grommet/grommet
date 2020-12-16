"use strict";

exports.__esModule = true;
exports.Calendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Heading = require("../Heading");

var _Keyboard = require("../Keyboard");

var _StyledCalendar = require("./StyledCalendar");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  return (!timeStamp.test(refDate || date) ? (0, _utils.localTimezoneToUTC)(new Date(date)) : new Date(date)).toISOString();
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

  start = start.getDay() === 0 && firstDayOfWeek === 1 ? start = (0, _utils.subtractDays)(start, 6) : // beginning of week
  start = (0, _utils.subtractDays)(start, start.getDay() - firstDayOfWeek);
  var end = (0, _utils.addDays)(start, 7 * 5 + 7); // 5 weeks to end of week

  return [start, end];
};

var millisecondsPerYear = 31557600000;

var CalendarDayButton = function CalendarDayButton(props) {
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
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
  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
    sizeProp: size,
    fillContainer: fill
  }, /*#__PURE__*/_react["default"].createElement(CalendarDayButton, _extends({
    fill: fill
  }, buttonProps), /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
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
    return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
      sizeProp: size,
      fillContainer: fill
    }, children);
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
    sizeProp: size,
    fillContainer: fill
  }, /*#__PURE__*/_react["default"].createElement(CalendarDayButton, _extends({
    fill: fill
  }, buttonProps), children));
};

var Calendar = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
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
      onReference = _ref3.onReference,
      onSelect = _ref3.onSelect,
      range = _ref3.range,
      referenceProp = _ref3.reference,
      _ref3$showAdjacentDay = _ref3.showAdjacentDays,
      showAdjacentDays = _ref3$showAdjacentDay === void 0 ? true : _ref3$showAdjacentDay,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 'medium' : _ref3$size,
      rest = _objectWithoutPropertiesLoose(_ref3, ["activeDate", "animate", "bounds", "children", "date", "dates", "daysOfWeek", "disabled", "fill", "firstDayOfWeek", "header", "locale", "onReference", "onSelect", "range", "reference", "showAdjacentDays", "size"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme; // set activeDate when caller changes it, allows us to change
  // it internally too


  var _useState = (0, _react.useState)(dateProp && range ? activeDates.end : activeDates.start),
      activeDate = _useState[0],
      setActiveDate = _useState[1];

  (0, _react.useEffect)(function () {
    if (activeDateProp) setActiveDate(activeDateProp);
  }, [activeDateProp]); // set date when caller changes it, allows us to change it internally too

  var _useState2 = (0, _react.useState)(dateProp),
      date = _useState2[0],
      setDate = _useState2[1];

  (0, _react.useEffect)(function () {
    return setDate(normalizeForTimezone(dateProp));
  }, [dateProp]); // set dates when caller changes it, allows us to change it internally too

  var _useState3 = (0, _react.useState)(datesProp),
      dates = _useState3[0],
      setDates = _useState3[1];

  (0, _react.useEffect)(function () {
    // convert all values to UTC
    if (Array.isArray(datesProp)) {
      if (Array.isArray(datesProp[0])) {
        var from;
        var to;

        var _datesProp$0$map = datesProp[0].map(function (day) {
          return day ? new Date(day) : undefined;
        });

        from = _datesProp$0$map[0];
        to = _datesProp$0$map[1];
        if (from) from = normalizeForTimezone(from, datesProp[0][0]);
        if (to) to = normalizeForTimezone(to, datesProp[0][0]);
        setDates([[from, to]]);
      } else {
        var datesArray = [];
        datesProp.forEach(function (d) {
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
            datesArray.push([_from, _to]);
          } else {
            datesArray.push(normalizeForTimezone(d));
          }
        });
        setDates(datesArray);
      }
    } else setDates(undefined);
  }, [datesProp]); // set reference based on what the caller passed or date/dates.

  var _useState4 = (0, _react.useState)(normalizeReference(referenceProp, date, dates)),
      reference = _useState4[0],
      setReference = _useState4[1];

  (0, _react.useEffect)(function () {
    return setReference(normalizeReference(referenceProp, dateProp, datesProp));
  }, [dateProp, datesProp, referenceProp]); // normalize bounds

  var _useState5 = (0, _react.useState)(boundsProp ? boundsProp.map(function (b) {
    return normalizeForTimezone(b);
  }) : undefined),
      bounds = _useState5[0],
      setBounds = _useState5[1];

  (0, _react.useEffect)(function () {
    if (boundsProp) setBounds(boundsProp.map(function (b) {
      return normalizeForTimezone(b);
    }));else setBounds(undefined);
  }, [boundsProp]); // calculate the bounds we display based on the reference

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
      setAnimating = _useState9[1]; // When the reference changes, we need to update the displayBounds.
  // This is easy when we aren't animating. If we are animating,
  // we temporarily increase the displayBounds to be the union of the old
  // and new ones and set slide to drive the animation. We keep track
  // of where we are heading via targetDisplayBounds. When the animation
  // finishes, we prune displayBounds down to where we are headed and
  // clear the slide and targetDisplayBounds.


  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
    if (targetDisplayBounds) {
      if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
        // only animate if the duration is within a year
        if (displayBounds[0].getTime() - targetDisplayBounds[0].getTime() < millisecondsPerYear) {
          setDisplayBounds([targetDisplayBounds[0], displayBounds[1]]);
          setSlide({
            direction: 'down',
            weeks: (0, _utils.daysApart)(displayBounds[0], targetDisplayBounds[0]) / 7
          });
          setAnimating(true);
        }
      } else if (targetDisplayBounds[1].getTime() > displayBounds[1].getTime()) {
        if (targetDisplayBounds[1].getTime() - displayBounds[1].getTime() < millisecondsPerYear) {
          setDisplayBounds([displayBounds[0], targetDisplayBounds[1]]);
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
  }, [animating, displayBounds, targetDisplayBounds]); // Last step in updating the displayBounds. Allows for pruning
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
  }, [animating, targetDisplayBounds]); // We have to deal with reference being the end of a month with more
  // days than the month we are changing to. So, we always set reference
  // to the first of the month before changing the month.

  var previousMonth = (0, _react.useMemo)(function () {
    return (0, _utils.endOfMonth)((0, _utils.subtractMonths)((0, _utils.startOfMonth)(reference), 1));
  }, [reference]);
  var nextMonth = (0, _react.useMemo)(function () {
    return (0, _utils.startOfMonth)((0, _utils.addMonths)((0, _utils.startOfMonth)(reference), 1));
  }, [reference]);
  var daysRef = (0, _react.useRef)();

  var _useState10 = (0, _react.useState)(),
      focus = _useState10[0],
      setFocus = _useState10[1];

  var _useState11 = (0, _react.useState)(),
      active = _useState11[0],
      setActive = _useState11[1];

  var changeReference = (0, _react.useCallback)(function (nextReference) {
    if ((0, _utils.betweenDates)(nextReference, bounds)) {
      setReference(nextReference);
      if (onReference) onReference(nextReference.toISOString());
    }
  }, [onReference, bounds]);
  var selectDate = (0, _react.useCallback)(function (selectedDate) {
    var nextDates;
    var nextDate; // output date with no timestamp if that's how user provided it

    var adjustedDate;

    if (!range) {
      nextDate = selectedDate;

      if (datesProp) {
        datesProp.forEach(function (d) {
          if (!timeStamp.test(d)) {
            adjustedDate = (0, _utils.formatToLocalYYYYMMDD)(nextDate);

            if (d === adjustedDate) {
              nextDate = undefined;
            } else {
              adjustedDate = undefined;
            }
          }
        });
      } else if (dateProp) {
        if (!timeStamp.test(dateProp)) {
          adjustedDate = (0, _utils.formatToLocalYYYYMMDD)(selectedDate);

          if (dateProp === adjustedDate) {
            nextDate = undefined;
          } else {
            adjustedDate = undefined;
          }
        } else {
          adjustedDate = undefined;
        }
      }
    } // everything down is a range
    else if (!dates) {
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
      } else {
        // have dates
        var priorDates = dates[0].map(function (d) {
          return new Date(d);
        });

        var _selDate = new Date(selectedDate);

        if (_selDate.getTime() === priorDates[0].getTime()) {
          nextDates = [[undefined, dates[0][1]]];
          setActiveDate(activeDates.start);
        } else if (_selDate.getTime() === priorDates[1].getTime()) {
          nextDates = [[dates[0][0], undefined]];
          setActiveDate(activeDates.end);
          if (activeDateProp) setActiveDate(activeDateProp);
        } else if (activeDate === activeDates.start) {
          if (_selDate.getTime() > priorDates[1].getTime()) {
            nextDates = [[selectedDate, undefined]];
          } else {
            nextDates = [[selectedDate, dates[0][1]]];
          }

          setActiveDate(activeDates.end);
          if (activeDateProp) setActiveDate(activeDateProp);
        } else if (activeDate === activeDates.end) {
          if (_selDate.getTime() < priorDates[0].getTime()) {
            nextDates = [[selectedDate, undefined]];
            setActiveDate(activeDates.end);
          } else {
            nextDates = [[dates[0][0], selectedDate]];
            setActiveDate(activeDates.start);
          }

          if (activeDateProp) setActiveDate(activeDateProp);
        } // cleanup


        if (!nextDates[0][0] && !nextDates[0][1]) nextDates = undefined;
      }

    setDates(nextDates);
    if (!dates) setDate(nextDate);
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
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row",
      justify: "between",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: true,
      pad: {
        horizontal: headingPadMap[size] || 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
      level: size === 'small' ? theme.calendar.heading && theme.calendar.heading.level || 4 : (theme.calendar.heading && theme.calendar.heading.level || 4) - 1,
      size: size,
      margin: "none"
    }, reference.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    }))), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: false,
      direction: "row",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: previousMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }),
      icon: /*#__PURE__*/_react["default"].createElement(PreviousIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: !(0, _utils.betweenDates)(previousMonth, bounds),
      onClick: function onClick() {
        return changeReference(previousMonth);
      }
    }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      a11yTitle: nextMonth.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }),
      icon: /*#__PURE__*/_react["default"].createElement(NextIcon, {
        size: size !== 'small' ? size : undefined
      }),
      disabled: !(0, _utils.betweenDates)(nextMonth, bounds),
      onClick: function onClick() {
        return changeReference(nextMonth);
      }
    })));
  };

  var renderDaysOfWeek = function renderDaysOfWeek() {
    var day = new Date(displayBounds[0]);
    var days = [];

    while (days.length < 7) {
      days.push( /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        key: days.length,
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        otherMonth: true,
        sizeProp: size,
        fillContainer: fill
      }, day.toLocaleDateString(locale, {
        weekday: 'narrow'
      }))));
      day = (0, _utils.addDays)(day, 1);
    }

    return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek, null, days);
  };

  var weeks = [];
  var day = new Date(displayBounds[0]);
  var days;
  var firstDayInMonth;

  while (day.getTime() < displayBounds[1].getTime()) {
    if (day.getDay() === firstDayOfWeek) {
      if (days) {
        weeks.push( /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek, {
          key: day.getTime(),
          fillContainer: fill
        }, days));
      }

      days = [];
    }

    var otherMonth = day.getMonth() !== reference.getMonth();

    if (!showAdjacentDays && otherMonth) {
      days.push( /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        sizeProp: size,
        fillContainer: fill
      })));
    } else if (
    /* Do not show adjacent days in 6th row if all days 
    fall in the next month */
    showAdjacentDays === 'trim' && otherMonth && weeks.length === 5 &&
    /* If the length days array is less than the current getDate()
    we know that all days in the array are from the next month. */
    days.length < day.getDate()) {
      days.push( /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDayContainer, {
        key: day.getTime(),
        sizeProp: size,
        fillContainer: fill
      }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledDay, {
        sizeProp: size,
        fillContainer: fill
      })));
    } else {
      (function () {
        var dateString = day.toISOString(); // this.dayRefs[dateString] = React.createRef();

        var selected = false;
        var inRange = false;
        var selectedState = (0, _utils.withinDates)(day, date || dates);

        if (selectedState === 2) {
          selected = true;
        } else if (selectedState === 1) {
          inRange = true;
        }

        var dayDisabled = (0, _utils.withinDates)(day, disabled) || bounds && !(0, _utils.betweenDates)(day, bounds);

        if (!firstDayInMonth && !dayDisabled && day.getMonth() === reference.getMonth()) {
          firstDayInMonth = dateString;
        }

        if (!children) {
          days.push( /*#__PURE__*/_react["default"].createElement(CalendarDay, {
            key: day.getTime(),
            buttonProps: {
              a11yTitle: day.toDateString(),
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
              }
            },
            isInRange: inRange,
            isSelected: selected,
            otherMonth: day.getMonth() !== reference.getMonth(),
            size: size,
            fill: fill
          }, day.getDate()));
        } else {
          days.push( /*#__PURE__*/_react["default"].createElement(CalendarCustomDay, {
            key: day.getTime(),
            buttonProps: onSelect ? {
              a11yTitle: day.toDateString(),
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

    day = (0, _utils.addDays)(day, 1);
  }

  weeks.push( /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeek, {
    key: day.getTime(),
    fillContainer: fill
  }, days));
  return /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledCalendar, _extends({
    ref: ref,
    sizeProp: size,
    fillContainer: fill
  }, rest), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: fill
  }, header ? header({
    date: reference,
    locale: locale,
    onPreviousMonth: function onPreviousMonth() {
      return changeReference(previousMonth);
    },
    onNextMonth: function onNextMonth() {
      return changeReference(nextMonth);
    },
    previousInBound: (0, _utils.betweenDates)(previousMonth, bounds),
    nextInBound: (0, _utils.betweenDates)(nextMonth, bounds)
  }) : renderCalendarHeader(previousMonth, nextMonth), daysOfWeek && renderDaysOfWeek(), /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: function onEnter() {
      return selectDate(active.toISOString());
    },
    onUp: function onUp(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll

      setActive((0, _utils.addDays)(active, -7));
    },
    onDown: function onDown(event) {
      event.preventDefault();
      event.stopPropagation(); // so the page doesn't scroll

      setActive((0, _utils.addDays)(active, 7));
    },
    onLeft: function onLeft() {
      return active && setActive((0, _utils.addDays)(active, -1));
    },
    onRight: function onRight() {
      return active && setActive((0, _utils.addDays)(active, 1));
    }
  }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeeksContainer, {
    ref: daysRef,
    sizeProp: size,
    fillContainer: fill,
    tabIndex: 0,
    focus: focus,
    onFocus: function onFocus() {
      setFocus(true);

      if (date && (0, _utils.betweenDates)(new Date(date), displayBounds)) {
        setActive(new Date(date));
      } else {
        setActive(new Date(firstDayInMonth));
      }
    },
    onBlur: function onBlur() {
      setFocus(false);
      setActive(undefined);
    }
  }, /*#__PURE__*/_react["default"].createElement(_StyledCalendar.StyledWeeks, {
    slide: slide,
    sizeProp: size,
    fillContainer: fill
  }, weeks)))));
});
Calendar.displayName = 'Calendar';
var CalendarDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CalendarDoc = require('./doc').doc(Calendar);
}

var CalendarWrapper = CalendarDoc || Calendar;
exports.Calendar = CalendarWrapper;