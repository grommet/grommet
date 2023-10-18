"use strict";

exports.__esModule = true;
exports.RangeSelector = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _Box = require("../Box");
var _EdgeControl = require("./EdgeControl");
var _FormContext = require("../Form/FormContext");
var _Text = require("../Text");
var _utils = require("../../utils");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["color", "defaultValues", "direction", "invert", "label", "max", "messages", "min", "name", "onChange", "opacity", "round", "size", "step", "values"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Container = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "RangeSelector__Container",
  componentId: "sc-siof5p-0"
})(["user-select:none;"]);
var RangeSelector = exports.RangeSelector = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
    _ref$defaultValues = _ref.defaultValues,
    defaultValues = _ref$defaultValues === void 0 ? [] : _ref$defaultValues,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    invert = _ref.invert,
    label = _ref.label,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    messages = _ref.messages,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    name = _ref.name,
    onChange = _ref.onChange,
    _ref$opacity = _ref.opacity,
    opacity = _ref$opacity === void 0 ? 'medium' : _ref$opacity,
    round = _ref.round,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step,
    valuesProp = _ref.values,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
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
  var maxRef = (0, _react.useRef)();
  var minRef = (0, _react.useRef)();
  var labelWidthRef = (0, _react.useRef)(0);
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      // ensure values are within min/max
      value: valuesProp == null ? void 0 : valuesProp.map(function (n) {
        return Math.min(max, Math.max(min, n));
      }),
      initialValue: defaultValues
    }),
    values = _formContext$useFormI[0],
    setValues = _formContext$useFormI[1];
  var change = (0, _react.useCallback)(function (nextValues) {
    setValues(nextValues);
    if (onChange) onChange(nextValues);
  }, [onChange, setValues]);
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
    }
    // align with closest step within [min, max]
    var result = Math.ceil(value / step) * step;
    if (result < min) {
      return min;
    }
    if (result > max) {
      return max;
    }
    return result;
  }, [direction, max, min, step]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
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
      change(nextValues);
    }
  }, [values, change, changing, moveValue, max, min, setMoveValue, valueForMouseCoord]);
  (0, _react.useEffect)(function () {
    var onMouseUp = function onMouseUp() {
      return setChanging(undefined);
    };
    if (changing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return function () {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
    return undefined;
  }, [changing, onMouseMove]);
  var onClick = (0, _react.useCallback)(function (event) {
    var value = valueForMouseCoord(event);
    if (value <= values[0] || value < values[1] && lastChange === 'lower') {
      setLastChange('lower');
      change([value, values[1]]);
    } else if (value >= values[1] || value > values[0] && lastChange === 'upper') {
      setLastChange('upper');
      change([values[0], value]);
    }
  }, [change, lastChange, valueForMouseCoord, values]);
  var onTouchMove = (0, _react.useCallback)(function (event) {
    var touchEvent = event.changedTouches[0];
    onMouseMove(touchEvent);
  }, [onMouseMove]);

  // keep the text values size consistent
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (maxRef.current && minRef.current) {
      maxRef.current.style.width = '';
      minRef.current.style.width = '';
      var width = Math.max(labelWidthRef.current, maxRef.current.getBoundingClientRect().width, minRef.current.getBoundingClientRect().width);
      maxRef.current.style.width = width + "px";
      minRef.current.style.width = width + "px";
      labelWidthRef.current = width;
    }
  });
  var lower = values[0],
    upper = values[1];
  // It needs to be true when vertical, due to how browsers manage height
  // const fill = direction === 'vertical' ? true : 'horizontal';
  var thickness = size === 'full' ? undefined : (0, _utils.parseMetricToNum)(theme.global.edgeSize[size] || size) + "px";
  var layoutProps = {
    fill: direction,
    round: round
  };
  if (direction === 'vertical') layoutProps.width = thickness;else layoutProps.height = thickness;
  if (size === 'full') layoutProps.alignSelf = 'stretch';
  var content = /*#__PURE__*/_react["default"].createElement(Container, _extends({
    ref: containerRef,
    direction: direction === 'vertical' ? 'column' : 'row',
    align: "center",
    fill: true
  }, label ? {} : rest, {
    tabIndex: "-1",
    onClick: onClick,
    onTouchMove: onTouchMove
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: lower - min + " 0 0"
    },
    background: invert ?
    // preserve existing dark, instead of using darknes
    // of this color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps)), /*#__PURE__*/_react["default"].createElement(_EdgeControl.EdgeControl, {
    a11yTitle: format({
      id: 'rangeSelector.lower',
      messages: messages
    }),
    role: "slider",
    "aria-valuenow": lower,
    "aria-valuemin": min,
    "aria-valuemax": max,
    tabIndex: 0,
    ref: ref,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "lower",
    onMouseDown: function onMouseDown() {
      return setChanging('lower');
    },
    onTouchStart: function onTouchStart() {
      return setChanging('lower');
    },
    onDecrease: lower - step >= min ? function () {
      return change([lower - step, upper]);
    } : undefined,
    onIncrease: lower + step <= upper ? function () {
      return change([lower + step, upper]);
    } : undefined
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: upper - lower + 1 + " 0 0",
      cursor: direction === 'vertical' ? 'ns-resize' : 'ew-resize'
    },
    background: invert ? undefined :
    // preserve existing dark, instead of using darknes of
    // this color
    {
      color: color || 'control',
      opacity: opacity,
      dark: theme.dark
    }
  }, layoutProps, {
    onMouseDown: function onMouseDown(event) {
      var nextMoveValue = valueForMouseCoord(event);
      setChanging('selection');
      setMoveValue(nextMoveValue);
    }
  })), /*#__PURE__*/_react["default"].createElement(_EdgeControl.EdgeControl, {
    a11yTitle: format({
      id: 'rangeSelector.upper',
      messages: messages
    }),
    role: "slider",
    "aria-valuenow": upper,
    "aria-valuemin": min,
    "aria-valuemax": max,
    tabIndex: 0,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "upper",
    onMouseDown: function onMouseDown() {
      return setChanging('upper');
    },
    onTouchStart: function onTouchStart() {
      return setChanging('upper');
    },
    onDecrease: upper - step >= lower ? function () {
      return change([lower, upper - step]);
    } : undefined,
    onIncrease: upper + step <= max ? function () {
      return change([lower, upper + step]);
    } : undefined
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    style: {
      flex: max - upper + " 0 0"
    },
    background: invert ?
    // preserve existing dark, instead of using darknes of this
    // color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps, {
    round: round
  })));
  if (label) {
    content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      direction: direction === 'vertical' ? 'column' : 'row',
      align: "center",
      fill: true
    }, rest), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      ref: minRef,
      textAlign: "end",
      size: "small",
      margin: {
        horizontal: 'small'
      }
    }, typeof label === 'function' ? label(lower) : lower), content, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      ref: maxRef,
      size: "small",
      margin: {
        horizontal: 'small'
      }
    }, typeof label === 'function' ? label(upper) : upper));
  }
  return content;
});
RangeSelector.displayName = 'RangeSelector';
RangeSelector.propTypes = _propTypes.RangeSelectorPropTypes;