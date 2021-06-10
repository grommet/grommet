"use strict";

exports.__esModule = true;
exports.Digital = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _StyledClock = require("./StyledClock");

var _excluded = ["elements", "precision", "run", "size"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Digit = function Digit(_ref) {
  var number = _ref.number,
      run = _ref.run,
      size = _ref.size;

  var _useState = (0, _react.useState)(number),
      previous = _useState[0],
      setPrevious = _useState[1];

  var _useState2 = (0, _react.useState)(),
      changing = _useState2[0],
      setChanging = _useState2[1];

  (0, _react.useEffect)(function () {
    if (number !== previous) {
      setChanging(true);
      var timer = setTimeout(function () {
        setPrevious(number);
        setChanging(false);
      }, 900);
      return function () {
        return clearTimeout(timer);
      };
    }

    return undefined;
  }, [number, previous]);

  if (changing) {
    var direction = run === 'backward' ? 'down' : 'up';
    return /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledDigitalDigit, {
      size: size
    }, /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledDigitalPrevious, {
      direction: direction
    }, Math.floor(previous)), /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledDigitalNext, {
      direction: direction
    }, Math.floor(number)));
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledDigitalDigit, {
    size: size
  }, Math.floor(number));
};

var Element = function Element(_ref2) {
  var number = _ref2.number,
      run = _ref2.run,
      sep = _ref2.sep,
      size = _ref2.size;
  var tens = Math.floor(number / 10);
  var ones = number % 10;
  var result = [/*#__PURE__*/_react["default"].createElement(Digit, {
    key: "tens",
    run: run,
    size: size,
    number: tens
  }), /*#__PURE__*/_react["default"].createElement(Digit, {
    key: "ones",
    run: run,
    size: size,
    number: ones
  })];

  if (sep) {
    result.unshift( /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledDigitalDigit, {
      key: "sep",
      size: size
    }, ":"));
  }

  return result;
};

var Digital = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var elements = props.elements,
      precision = props.precision,
      run = props.run,
      size = props.size,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var seconds;

  if (precision === 'seconds') {
    seconds = /*#__PURE__*/_react["default"].createElement(Element, {
      number: elements.seconds,
      run: run,
      size: size,
      sep: true
    });
  }

  var minutes;

  if (precision === 'minutes' || precision === 'seconds') {
    minutes = /*#__PURE__*/_react["default"].createElement(Element, {
      number: elements.minutes,
      run: run,
      size: size,
      sep: true
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    direction: "row"
  }, rest), /*#__PURE__*/_react["default"].createElement(Element, {
    number: elements.hours12 || elements.hours,
    run: run,
    size: size
  }), minutes, seconds);
});
exports.Digital = Digital;