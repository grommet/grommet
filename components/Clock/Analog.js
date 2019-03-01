"use strict";

exports.__esModule = true;
exports.Analog = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _StyledClock = require("./StyledClock");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// this will serve both minutes and hours (360 / 6)
var ANGLE_UNIT = 6; // 360 / 12

var HOUR_ANGLE_UNIT = 30;

var getClockDimensions = function getClockDimensions(theme) {
  return {
    size: (0, _utils.parseMetricToNum)(theme.clock.analog.size.medium),
    secondSize: (0, _utils.parseMetricToNum)(theme.clock.analog.second.size),
    minuteSize: (0, _utils.parseMetricToNum)(theme.clock.analog.minute.size),
    hourSize: (0, _utils.parseMetricToNum)(theme.clock.analog.hour.size)
  };
};

var getClockState = function getClockState(_ref) {
  var hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds;
  var hour12 = hours > 12 ? hours - 12 : hours;
  var minuteAngle = minutes * ANGLE_UNIT;
  return {
    // offset hour angle by half of the minute angle so that it gets closer to the next hour
    hourAngle: hour12 * HOUR_ANGLE_UNIT + minutes / 2,
    minuteAngle: minuteAngle,
    secondAngle: seconds * ANGLE_UNIT
  };
};

var Analog =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Analog, _Component);

  function Analog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  Analog.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var elements = nextProps.elements;
    var nextState = getClockState(elements);

    if (prevState.hourAngle === undefined || Object.keys(nextState).some(function (k) {
      return prevState[k] !== nextState[k];
    })) {
      return nextState;
    }

    return null;
  };

  var _proto = Analog.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        precision = _this$props.precision,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["precision", "theme"]);

    var _this$state = this.state,
        hourAngle = _this$state.hourAngle,
        minuteAngle = _this$state.minuteAngle,
        secondAngle = _this$state.secondAngle;

    var _getClockDimensions = getClockDimensions(theme),
        size = _getClockDimensions.size,
        secondSize = _getClockDimensions.secondSize,
        minuteSize = _getClockDimensions.minuteSize,
        hourSize = _getClockDimensions.hourSize;

    var halfSize = size / 2;
    var secondHand;

    if (precision === 'seconds') {
      secondHand = _react.default.createElement(_StyledClock.StyledSecond, {
        x1: halfSize,
        y1: halfSize,
        x2: halfSize,
        y2: secondSize,
        stroke: "#000000",
        strokeLinecap: theme.clock.analog.second.shape,
        style: {
          transform: "rotate(" + secondAngle + "deg)",
          transformOrigin: halfSize + "px " + halfSize + "px"
        }
      });
    }

    var minuteHand;

    if (precision === 'seconds' || precision === 'minutes') {
      minuteHand = _react.default.createElement(_StyledClock.StyledMinute, {
        x1: halfSize,
        y1: halfSize,
        x2: halfSize,
        y2: minuteSize,
        stroke: "#000000",
        strokeLinecap: theme.clock.analog.minute.shape,
        style: {
          transform: "rotate(" + minuteAngle + "deg)",
          transformOrigin: halfSize + "px " + halfSize + "px"
        }
      });
    }

    return _react.default.createElement(_StyledClock.StyledAnalog, _extends({
      version: "1.1",
      width: size,
      height: size,
      preserveAspectRatio: "xMidYMid meet",
      viewBox: "0 0 " + size + " " + size
    }, rest), secondHand, minuteHand, _react.default.createElement(_StyledClock.StyledHour, {
      x1: halfSize,
      y1: halfSize,
      x2: halfSize,
      y2: hourSize,
      stroke: "#000000",
      strokeLinecap: theme.clock.analog.hour.shape,
      style: {
        transform: "rotate(" + hourAngle + "deg)",
        transformOrigin: halfSize + "px " + halfSize + "px"
      }
    }));
  };

  return Analog;
}(_react.Component);

_defineProperty(Analog, "defaultProps", {
  size: 'medium'
});

Object.setPrototypeOf(Analog.defaultProps, _defaultProps.defaultProps);
var AnalogWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Analog);
exports.Analog = AnalogWrapper;