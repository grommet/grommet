"use strict";

exports.__esModule = true;
exports.Clock = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Analog = require("./Analog");

var _Digital = require("./Digital");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TIME_REGEXP = /T([0-9]{2}):([0-9]{2})(?::([0-9.,]{2,}))?/;
var DURATION_REGEXP = /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;

var parseTime = function parseTime(time, hourLimit) {
  var result = {};

  if (time) {
    var match = DURATION_REGEXP.exec(time);

    if (match) {
      result.hours = parseFloat(match[2]);

      if (hourLimit === 12) {
        result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
      }

      result.minutes = parseFloat(match[3]) || 0;
      result.seconds = parseFloat(match[4]) || 0;
      result.duration = true;
    } else {
      match = TIME_REGEXP.exec(time);

      if (match) {
        result.hours = parseFloat(match[1]);

        if (hourLimit === 12) {
          result.hours12 = result.hours > 12 ? result.hours - 12 : result.hours;
        }

        result.minutes = parseFloat(match[2]) || 0;
        result.seconds = parseFloat(match[3]) || 0;
      } else {
        console.error("Grommet Clock cannot parse '" + time + "'");
      }
    }
  } else {
    var date = new Date();
    result.hours = date.getHours();
    result.minutes = date.getMinutes();
    result.seconds = date.getSeconds();
  }

  return result;
};

var Clock = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$hourLimit = _ref.hourLimit,
      hourLimit = _ref$hourLimit === void 0 ? 24 : _ref$hourLimit,
      onChange = _ref.onChange,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? 'seconds' : _ref$precision,
      _ref$run = _ref.run,
      run = _ref$run === void 0 ? 'forward' : _ref$run,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      time = _ref.time,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'analog' : _ref$type,
      rest = _objectWithoutPropertiesLoose(_ref, ["hourLimit", "onChange", "precision", "run", "size", "time", "type"]);

  var _useState = (0, _react.useState)(parseTime(time, hourLimit)),
      elements = _useState[0],
      setElements = _useState[1];

  (0, _react.useEffect)(function () {
    return setElements(parseTime(time, hourLimit));
  }, [hourLimit, time]);
  (0, _react.useEffect)(function () {
    var atDurationEnd = run === 'backward' && elements.duration && !elements.hours && !elements.minutes && !elements.seconds;

    if (run && !atDurationEnd) {
      // set the interval time based on the precision
      var interval = 1000;
      var increment = 'seconds';

      if (precision !== 'seconds' && elements.seconds === 0) {
        interval *= 60;
        increment = 'minutes';

        if (precision !== 'minutes' && elements.minutes === 0) {
          interval *= 60;
          increment = 'hours';
        }
      }

      var timer = setInterval(function () {
        var nextElements = _extends({}, elements); // adjust time based on precision


        if (increment === 'seconds') {
          if (run === 'backward') {
            nextElements.seconds -= 1;
          } else {
            nextElements.seconds += 1;
          }
        } else if (increment === 'minutes') {
          if (run === 'backward') {
            nextElements.minutes -= 1;
          } else {
            nextElements.minutes += 1;
          }
        } else if (increment === 'hours') {
          if (run === 'backward') {
            nextElements.hours -= 1;
          } else {
            nextElements.hours += 1;
          }
        } // deal with overflows


        if (nextElements.seconds >= 60) {
          nextElements.minutes += Math.floor(nextElements.seconds / 60);
          nextElements.seconds = 0;
        } else if (nextElements.seconds < 0) {
          nextElements.minutes += Math.floor(nextElements.seconds / 60);
          nextElements.seconds = 59;
        }

        if (nextElements.minutes >= 60) {
          nextElements.hours += Math.floor(nextElements.minutes / 60);
          nextElements.minutes = 0;
        } else if (nextElements.minutes < 0) {
          nextElements.hours += Math.floor(nextElements.minutes / 60);
          nextElements.minutes = 59;
        }

        if (nextElements.hours >= 24 || nextElements.hours < 0) {
          nextElements.hours = 0;
        }

        if (hourLimit === 12) {
          nextElements.hours12 = nextElements.hours > 12 ? nextElements.hours - 12 : nextElements.hours;
        }

        setElements(nextElements);

        if (onChange) {
          var e = nextElements;

          if (e.duration) {
            onChange("P" + e.hours + "H" + e.minutes + "M" + e.seconds + "S");
          } else {
            onChange("T" + e.hours + ":" + e.minutes + ":" + e.seconds);
          }
        }
      }, interval);
      return function () {
        return clearInterval(timer);
      };
    }

    return undefined;
  }, [elements, hourLimit, onChange, precision, run]);
  var content;

  if (type === 'analog') {
    content = /*#__PURE__*/_react["default"].createElement(_Analog.Analog, _extends({
      ref: ref,
      elements: elements,
      precision: precision,
      size: size
    }, rest));
  } else if (type === 'digital') {
    content = /*#__PURE__*/_react["default"].createElement(_Digital.Digital, _extends({
      ref: ref,
      elements: elements,
      precision: precision,
      run: run,
      size: size
    }, rest));
  }

  return content;
});
Clock.displayName = 'Clock';
var ClockDoc;

if (process.env.NODE_ENV !== 'production') {
  ClockDoc = require('./doc').doc(Clock); // eslint-disable-line global-require
}

var ClockWrapper = ClockDoc || Clock;
exports.Clock = ClockWrapper;