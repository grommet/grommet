"use strict";

exports.__esModule = true;
exports.RangeSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Box = require("../Box");

var _EdgeControl = require("./EdgeControl");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Container = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "RangeSelector__Container",
  componentId: "siof5p-0"
})(["user-select:none;"]);
var RangeSelector = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
      invert = _ref.invert,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? {
    lower: 'Lower Bounds',
    upper: 'Upper Bounds'
  } : _ref$messages,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      onChange = _ref.onChange,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? 'medium' : _ref$opacity,
      round = _ref.round,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      _ref$values = _ref.values,
      values = _ref$values === void 0 ? [] : _ref$values,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "direction", "invert", "max", "messages", "min", "onChange", "opacity", "round", "size", "step", "values"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme;

  var _useState = (0, _react.useState)(),
      changing = _useState[0],
      setChanging = _useState[1];

  var _useState2 = (0, _react.useState)(),
      lastChange = _useState2[0],
      setLastChange = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      moveValue = _useState3[0],
      setMoveValue = _useState3[1];

  var containerRef = (0, _react.useRef)();
  var valueForMouseCoord = (0, _react.useCallback)(function (event) {
    var rect = containerRef.current.getBoundingClientRect();
    var value;

    if (direction === 'vertical') {
      // there is no x and y in unit testing
      var y = event.clientY - (rect.top || 0); // test resilience

      var scaleY = rect.height / (max - min + 1) || 1; // test resilience

      value = Math.floor(y / scaleY) + min;
    } else {
      var x = event.clientX - (rect.left || 0); // test resilience

      var scaleX = rect.width / (max - min + 1) || 1; // test resilience

      value = Math.floor(x / scaleX) + min;
    } // align with closest step within [min, max]


    var result = Math.ceil(value / step) * step;

    if (result < min) {
      return min;
    }

    if (result > max) {
      return max;
    }

    return result;
  }, [direction, max, min, step]);
  (0, _react.useEffect)(function () {
    var mouseMove = function mouseMove(event) {
      var value = valueForMouseCoord(event);
      var nextValues;

      if (changing === 'lower' && value <= values[1] && value !== moveValue) {
        nextValues = [value, values[1]];
      } else if (changing === 'upper' && value >= values[0] && value !== moveValue) {
        nextValues = [values[0], value];
      } else if (changing === 'selection' && value !== moveValue) {
        if (value === max) {
          nextValues = [max - (values[1] - values[0]), max];
        } else if (value === min) {
          nextValues = [min, min + (values[1] - values[0])];
        } else {
          var delta = value - moveValue;

          if (values[0] + delta >= min && values[1] + delta <= max) {
            nextValues = [values[0] + delta, values[1] + delta];
          }
        }
      }

      if (nextValues) {
        setMoveValue(value);
        onChange(nextValues);
      }
    };

    var mouseUp = function mouseUp() {
      return setChanging(undefined);
    };

    if (changing) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
      return function () {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
      };
    }

    return undefined;
  }, [changing, max, min, moveValue, onChange, valueForMouseCoord, values]);
  var onClick = (0, _react.useCallback)(function (event) {
    var value = valueForMouseCoord(event);

    if (value <= values[0] || value < values[1] && lastChange === 'lower') {
      setLastChange('lower');
      onChange([value, values[1]]);
    } else if (value >= values[1] || value > values[0] && lastChange === 'upper') {
      setLastChange('upper');
      onChange([values[0], value]);
    }
  }, [lastChange, onChange, valueForMouseCoord, values]);
  var lower = values[0],
      upper = values[1]; // It needs to be true when vertical, due to how browsers manage height
  // const fill = direction === 'vertical' ? true : 'horizontal';

  var thickness = size === 'full' ? undefined : (0, _utils.parseMetricToNum)(theme.global.edgeSize[size] || size) + "px";
  var layoutProps = {
    fill: direction,
    round: round
  };
  if (direction === 'vertical') layoutProps.width = thickness;else layoutProps.height = thickness;
  if (size === 'full') layoutProps.alignSelf = 'stretch';
  return /*#__PURE__*/_react["default"].createElement(Container, _extends({
    ref: containerRef,
    direction: direction === 'vertical' ? 'column' : 'row',
    align: "center",
    fill: true
  }, rest, {
    tabIndex: "-1",
    onClick: onChange ? onClick : undefined
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: lower - min + " 0 0"
    },
    background: invert ? // preserve existing dark, instead of using darknes
    // of this color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps)), /*#__PURE__*/_react["default"].createElement(_EdgeControl.EdgeControl, {
    a11yTitle: messages.lower,
    tabIndex: 0,
    ref: ref,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "lower",
    onMouseDown: onChange ? function () {
      return setChanging('lower');
    } : undefined,
    onDecrease: onChange && lower - step >= min ? function () {
      return onChange([lower - step, upper]);
    } : undefined,
    onIncrease: onChange && lower + step <= upper ? function () {
      return onChange([lower + step, upper]);
    } : undefined
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: upper - lower + 1 + " 0 0",
      cursor: direction === 'vertical' ? 'ns-resize' : 'ew-resize'
    },
    background: invert ? undefined : // preserve existing dark, instead of using darknes of
    // this color
    {
      color: color || 'control',
      opacity: opacity,
      dark: theme.dark
    }
  }, layoutProps, {
    onMouseDown: onChange ? function (event) {
      var nextMoveValue = valueForMouseCoord(event);
      setChanging('selection');
      setMoveValue(nextMoveValue);
    } : undefined
  })), /*#__PURE__*/_react["default"].createElement(_EdgeControl.EdgeControl, {
    a11yTitle: messages.upper,
    tabIndex: 0,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "upper",
    onMouseDown: onChange ? function () {
      return setChanging('upper');
    } : undefined,
    onDecrease: onChange && upper - step >= lower ? function () {
      return onChange([lower, upper - step]);
    } : undefined,
    onIncrease: onChange && upper + step <= max ? function () {
      return onChange([lower, upper + step]);
    } : undefined
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: max - upper + " 0 0"
    },
    background: invert ? // preserve existing dark, instead of using darknes of this
    // color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps, {
    round: round
  })));
});
RangeSelector.displayName = 'RangeSelector';
var RangeSelectorDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeSelectorDoc = require('./doc').doc(RangeSelector);
}

var RangeSelectorWrapper = RangeSelectorDoc || RangeSelector;
exports.RangeSelector = RangeSelectorWrapper;