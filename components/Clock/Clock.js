"use strict";

exports.__esModule = true;
exports.Clock = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Analog = require("./Analog");
var _Digital = require("./Digital");
var _propTypes = require("./propTypes");
var _excluded = ["hourLimit", "onChange", "precision", "run", "size", "time", "type"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var TIME_REGEXP = /T([0-9]{2}):([0-9]{2})(?::([0-9.,]{2,}))?/;
var DURATION_REGEXP = /^(-|\+)?P.*T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?$/;
var parseTime = function parseTime(time, hourLimit) {
  var result = {};
  if (time) {
    var match = DURATION_REGEXP.exec(time);
    if (match) {
      result.hours = parseFloat(match[2]) || 0;
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
var Clock = exports.Clock = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
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
        var nextElements = _extends({}, elements);
        // adjust time based on precision
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
        }

        // deal with overflows
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
Clock.propTypes = _propTypes.ClockPropTypes;