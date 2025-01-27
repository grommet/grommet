"use strict";

exports.__esModule = true;
exports.RangeInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormContext = require("../Form/FormContext");
var _StyledRangeInput = require("./StyledRangeInput");
var _propTypes = require("./propTypes");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "color", "focus", "focusIndicator", "name", "onChange", "onFocus", "onBlur", "value", "step", "min", "max"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RangeInput = exports.RangeInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$rangeInput;
  var a11yTitle = _ref.a11yTitle,
    color = _ref.color,
    focusProp = _ref.focus,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    name = _ref.name,
    _onChange = _ref.onChange,
    _onFocus = _ref.onFocus,
    _onBlur = _ref.onBlur,
    valueProp = _ref.value,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useState = (0, _react.useState)(focusProp),
    focus = _useState[0],
    setFocus = _useState[1];
  var scrollEnabled = (theme == null || (_theme$rangeInput = theme.rangeInput) == null ? void 0 : _theme$rangeInput.wheel) !== false;
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var _useState2 = (0, _react.useState)({
      x: null,
      y: null
    }),
    scroll = _useState2[0],
    setScroll = _useState2[1];
  var rangeInputRef = (0, _utils.useForwardedRef)(ref);
  (0, _react.useEffect)(function () {
    var x = scroll.x,
      y = scroll.y;
    var handleScrollTo = function handleScrollTo() {
      return window.scrollTo(x, y);
    };
    if (x !== null && y !== null && scrollEnabled) {
      window.addEventListener('scroll', handleScrollTo);
    }
    // there is no need to remove this event listener if scroll is disabled
    // but we need to remove it if scroll is enabled and user switches to
    // a theme with scroll disabled
    return function () {
      window.removeEventListener('scroll', handleScrollTo);
    };
  }, [scroll, scrollEnabled]);
  var setRangeInputValue = (0, _react.useCallback)(function (nextValue) {
    if (nextValue > max || nextValue < min) return;
    // Calling set value function directly on input because React library
    // overrides setter `event.target.value =` and loses original event
    // target fidelity.
    // https://stackoverflow.com/a/46012210
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(rangeInputRef.current, nextValue);
    var event = new Event('input', {
      bubbles: true
    });
    rangeInputRef.current.dispatchEvent(event);
  }, [rangeInputRef, min, max]);
  var handleOnWheel = function handleOnWheel(event) {
    var newValue = parseFloat(value);
    if (event.deltaY < 0) {
      setRangeInputValue(newValue + step);
    } else {
      setRangeInputValue(newValue - step);
    }
  };
  // This is to make sure scrollbar doesn't move
  // when user changes RangeInput value.
  var handleMouseOver = function handleMouseOver() {
    return setScroll({
      x: window.scrollX,
      y: window.scrollY
    });
  };
  var handleMouseOut = function handleMouseOut() {
    return setScroll({
      x: null,
      y: null
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_StyledRangeInput.StyledRangeInput, _extends({
    "aria-label": a11yTitle,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value,
    ref: rangeInputRef,
    name: name,
    focus: focus,
    focusIndicator: focusIndicator,
    value: value || value === 0 ? value : ''
  }, passThemeFlag, rest, {
    color: color,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: function onChange(event) {
      setValue(event.target.value);
      if (_onChange) _onChange(event);
    },
    onMouseOver: scrollEnabled ? handleMouseOver : undefined,
    onMouseOut: scrollEnabled ? handleMouseOut : undefined,
    onWheel: scrollEnabled ? handleOnWheel : undefined,
    step: step,
    type: "range",
    min: min,
    max: max
  }));
});
RangeInput.displayName = 'RangeInput';
RangeInput.propTypes = _propTypes.RangeInputPropTypes;