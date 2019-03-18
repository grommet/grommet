"use strict";

exports.__esModule = true;
exports.Calendar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Heading = require("../Heading");

var _Keyboard = require("../Keyboard");

var _StyledCalendar = require("./StyledCalendar");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var headingPadMap = {
  small: 'xsmall',
  medium: 'small',
  large: 'medium'
};

var buildStartEnd = function buildStartEnd(reference, firstDayOfWeek) {
  var start = new Date(reference);
  start.setDate(1); // first of month

  start = (0, _utils.subtractDays)(start, start.getDay() - firstDayOfWeek); // beginning of week

  var end = (0, _utils.addDays)(start, 7 * 5 + 7); // 5 weeks to end of week

  return {
    start: start,
    end: end
  };
};

var buildState = function buildState(props) {
  var date = props.date,
      dates = props.dates,
      firstDayOfWeek = props.firstDayOfWeek,
      reference = props.reference;
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
    }
  } else {
    normalizedReference = new Date();
  }

  return _extends({}, buildStartEnd(normalizedReference, firstDayOfWeek), {
    reference: normalizedReference
  });
};

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Calendar, _Component);

  function Calendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "dayRefs", {});

    _defineProperty(_assertThisInitialized(_this), "clearSlideStateLater", function () {
      clearTimeout(_this.timer);
      _this.timer = setTimeout(function () {
        var targetStartEnd = _this.state.targetStartEnd;

        if (targetStartEnd) {
          _this.setState({
            start: targetStartEnd.start,
            end: targetStartEnd.end,
            targetStartEnd: undefined,
            slide: undefined
          });
        } // Wait for animation to finish before cleaning up. Empirically determined.

      }, 800);
    });

    _defineProperty(_assertThisInitialized(_this), "setReference", function (reference) {
      var _this$props = _this.props,
          animate = _this$props.animate,
          bounds = _this$props.bounds,
          firstDayOfWeek = _this$props.firstDayOfWeek,
          onReference = _this$props.onReference;
      var _this$state = _this.state,
          start = _this$state.start,
          end = _this$state.end,
          targetStartEnd = _this$state.targetStartEnd;

      if ((0, _utils.betweenDates)(reference, bounds)) {
        var nextStartEnd = buildStartEnd(reference, firstDayOfWeek);
        var nextState = {
          reference: reference
        }; // if we're changing too fast, bypass animation

        if (!animate || targetStartEnd) {
          nextState.targetStartEnd = nextStartEnd;
          nextState.start = nextStartEnd.start;
          nextState.end = nextStartEnd.end;
          nextState.targetStartEnd = undefined;
          nextState.slide = undefined;
        } else {
          nextState.targetStartEnd = nextStartEnd;

          if (nextStartEnd.start.getTime() < start.getTime()) {
            nextState.start = nextStartEnd.start;
            nextState.slide = {
              direction: 'down',
              weeks: (0, _utils.daysApart)(start, nextStartEnd.start) / 7
            };
          } else if (nextStartEnd.end.getTime() > end.getTime()) {
            nextState.end = nextStartEnd.end;
            nextState.slide = {
              direction: 'up',
              weeks: (0, _utils.daysApart)(nextStartEnd.end, end) / 7
            };
          }
        }

        _this.clearSlideStateLater();

        _this.setState(nextState, function () {
          if (onReference) {
            onReference(reference.toISOString());
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (day) {
      return function () {
        var bounds = _this.props.bounds;
        var reference = _this.state.reference;

        if ((0, _utils.betweenDates)(day, bounds)) {
          _this.setState({
            focused: day
          }, function () {
            if (day.getMonth() !== reference.getMonth()) {
              _this.setReference(day);
            }
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onClickDay", function (dateString) {
      return function () {
        var _this$props2 = _this.props,
            onSelect = _this$props2.onSelect,
            range = _this$props2.range;

        if (range) {
          var nextState = (0, _utils.updateDateRange)(dateString, _this.state);

          _this.setState(nextState);

          if (onSelect) {
            onSelect(nextState.dates || nextState.date || undefined);
          }
        } else if (onSelect) {
          onSelect(dateString);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setFocus", function (day) {
      var ref = _this.dayRefs[day.toISOString()];

      if (ref && ref.current) {
        ref.current.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendarHeader", function (previousMonth, nextMonth) {
      var _this$props3 = _this.props,
          bounds = _this$props3.bounds,
          locale = _this$props3.locale,
          size = _this$props3.size,
          theme = _this$props3.theme;
      var reference = _this.state.reference;
      var PreviousIcon = size === 'small' ? theme.calendar.icons.small.previous : theme.calendar.icons.previous;
      var NextIcon = size === 'small' ? theme.calendar.icons.small.next : theme.calendar.icons.next;
      return _react.default.createElement(_Box.Box, {
        direction: "row",
        justify: "between",
        align: "center"
      }, _react.default.createElement(_Box.Box, {
        flex: true,
        pad: {
          horizontal: headingPadMap[size] || 'small'
        }
      }, _react.default.createElement(_Heading.Heading, {
        level: size === 'small' ? 4 : 3,
        size: size,
        margin: "none"
      }, reference.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric'
      }))), _react.default.createElement(_Box.Box, {
        flex: false,
        direction: "row",
        align: "center"
      }, _react.default.createElement(_Button.Button, {
        a11yTitle: previousMonth.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }),
        icon: _react.default.createElement(PreviousIcon, {
          size: size !== 'small' ? size : undefined
        }),
        disabled: !(0, _utils.betweenDates)(previousMonth, bounds),
        onClick: function onClick() {
          return _this.setReference(previousMonth);
        }
      }), _react.default.createElement(_Button.Button, {
        a11yTitle: nextMonth.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }),
        icon: _react.default.createElement(NextIcon, {
          size: size !== 'small' ? size : undefined
        }),
        disabled: !(0, _utils.betweenDates)(nextMonth, bounds),
        onClick: function onClick() {
          return _this.setReference(nextMonth);
        }
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderDaysOfWeek", function (locale, size, start) {
      var day = new Date(start);
      var days = [];

      while (days.length < 7) {
        days.push(_react.default.createElement(_StyledCalendar.StyledDayContainer, {
          key: days.length,
          sizeProp: size
        }, _react.default.createElement(_StyledCalendar.StyledDay, {
          otherMonth: true,
          sizeProp: size
        }, day.toLocaleDateString(locale, {
          weekday: 'narrow'
        }))));
        day = (0, _utils.addDays)(day, 1);
      }

      return _react.default.createElement(_StyledCalendar.StyledWeek, null, days);
    });

    return _this;
  }

  Calendar.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var reference = nextProps.reference;
    var prevReference = prevState.reference;

    if (Object.prototype.hasOwnProperty.call(nextProps, 'date') || Object.prototype.hasOwnProperty.call(nextProps, 'dates') || !prevReference || reference) {
      var state = {};

      if (Object.prototype.hasOwnProperty.call(nextProps, 'date') || Object.prototype.hasOwnProperty.call(nextProps, 'dates')) {
        state.date = nextProps.date;
        state.dates = nextProps.dates;
      }

      if (!prevReference || reference) {
        state = _extends({}, state, buildState(nextProps));
      }

      return state;
    }

    return null;
  };

  var _proto = Calendar.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var focused = this.state.focused;

    if (focused) {
      var ref = this.dayRefs[focused.toISOString()];

      if (ref && ref.current && ref.current !== document.activeElement) {
        ref.current.focus();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timer);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        bounds = _this$props4.bounds,
        dateProp = _this$props4.date,
        datesProp = _this$props4.dates,
        disabled = _this$props4.disabled,
        daysOfWeek = _this$props4.daysOfWeek,
        firstDayOfWeek = _this$props4.firstDayOfWeek,
        header = _this$props4.header,
        locale = _this$props4.locale,
        onReference = _this$props4.onReference,
        onSelect = _this$props4.onSelect,
        range = _this$props4.range,
        showAdjacentDays = _this$props4.showAdjacentDays,
        size = _this$props4.size,
        theme = _this$props4.theme,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["bounds", "date", "dates", "disabled", "daysOfWeek", "firstDayOfWeek", "header", "locale", "onReference", "onSelect", "range", "showAdjacentDays", "size", "theme"]);

    var _this$state2 = this.state,
        date = _this$state2.date,
        dates = _this$state2.dates,
        focused = _this$state2.focused,
        start = _this$state2.start,
        reference = _this$state2.reference,
        end = _this$state2.end,
        slide = _this$state2.slide; // We have to deal with reference being the end of a month with more
    // days than the month we are changing to. So, we always set reference
    // to the first of the month before changing the month.

    var previousMonth = (0, _utils.endOfMonth)((0, _utils.subtractMonths)((0, _utils.startOfMonth)(reference), 1));
    var nextMonth = (0, _utils.startOfMonth)((0, _utils.addMonths)((0, _utils.startOfMonth)(reference), 1));
    var weeks = [];
    var day = new Date(start);
    var days;
    this.dayRefs = {};

    while (day.getTime() < end.getTime()) {
      if (day.getDay() === firstDayOfWeek) {
        if (days) {
          weeks.push(_react.default.createElement(_StyledCalendar.StyledWeek, {
            key: day.getTime()
          }, days));
        }

        days = [];
      }

      var otherMonth = day.getMonth() !== reference.getMonth();

      if (!showAdjacentDays && otherMonth) {
        days.push(_react.default.createElement(_StyledCalendar.StyledDayContainer, {
          key: day.getTime(),
          sizeProp: size
        }, _react.default.createElement(_StyledCalendar.StyledDay, {
          sizeProp: size
        })));
      } else {
        var dateString = day.toISOString();
        this.dayRefs[dateString] = _react.default.createRef();
        var selected = false;
        var inRange = false;
        var selectedState = (0, _utils.withinDates)(day, date || dates);

        if (selectedState === 2) {
          selected = true;
        } else if (selectedState === 1) {
          inRange = true;
        }

        var dayDisabled = (0, _utils.withinDates)(day, disabled) || bounds && !(0, _utils.betweenDates)(day, bounds);
        days.push(_react.default.createElement(_StyledCalendar.StyledDayContainer, {
          key: day.getTime(),
          sizeProp: size
        }, _react.default.createElement(_Button.Button, {
          ref: this.dayRefs[dateString],
          a11yTitle: day.toDateString(),
          plain: true,
          hoverIndicator: !dayDisabled,
          disabled: dayDisabled,
          onClick: this.onClickDay(dateString),
          onFocus: this.onFocus(day),
          onBlur: function onBlur() {
            return _this2.setState({
              focused: false
            });
          }
        }, _react.default.createElement(_StyledCalendar.StyledDay, {
          inRange: inRange,
          otherMonth: day.getMonth() !== reference.getMonth(),
          isSelected: selected,
          sizeProp: size
        }, day.getDate()))));
      }

      day = (0, _utils.addDays)(day, 1);
    }

    weeks.push(_react.default.createElement(_StyledCalendar.StyledWeek, {
      key: day.getTime()
    }, days));
    return _react.default.createElement(_StyledCalendar.StyledCalendar, _extends({
      sizeProp: size
    }, rest), _react.default.createElement(_Keyboard.Keyboard, {
      onUp: function onUp(event) {
        event.preventDefault();

        _this2.setFocus((0, _utils.addDays)(focused, -7));
      },
      onDown: function onDown(event) {
        event.preventDefault();

        _this2.setFocus((0, _utils.addDays)(focused, 7));
      },
      onLeft: function onLeft() {
        return focused && _this2.setFocus((0, _utils.addDays)(focused, -1));
      },
      onRight: function onRight() {
        return focused && _this2.setFocus((0, _utils.addDays)(focused, 1));
      }
    }, _react.default.createElement(_Box.Box, null, header ? header({
      date: reference,
      locale: locale,
      onPreviousMonth: function onPreviousMonth() {
        return _this2.setReference(previousMonth);
      },
      onNextMonth: function onNextMonth() {
        return _this2.setReference(nextMonth);
      },
      previousInBound: (0, _utils.betweenDates)(previousMonth, bounds),
      nextInBound: (0, _utils.betweenDates)(nextMonth, bounds)
    }) : this.renderCalendarHeader(previousMonth, nextMonth), daysOfWeek && this.renderDaysOfWeek(locale, size, start), _react.default.createElement(_StyledCalendar.StyledWeeksContainer, {
      sizeProp: size
    }, _react.default.createElement(_StyledCalendar.StyledWeeks, {
      slide: slide,
      sizeProp: size
    }, weeks)))));
  };

  return Calendar;
}(_react.Component);

_defineProperty(Calendar, "defaultProps", {
  animate: true,
  firstDayOfWeek: 0,
  size: 'medium',
  locale: 'en-US',
  showAdjacentDays: true
});

Object.setPrototypeOf(Calendar.defaultProps, _defaultProps.defaultProps);
var CalendarDoc;

if (process.env.NODE_ENV !== 'production') {
  CalendarDoc = require('./doc').doc(Calendar); // eslint-disable-line global-require
}

var CalendarWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(CalendarDoc || Calendar);
exports.Calendar = CalendarWrapper;