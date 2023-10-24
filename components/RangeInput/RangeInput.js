"use strict";

exports.__esModule = true;
exports.RangeInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _FormContext = require("../Form/FormContext");
var _StyledRangeInput = require("./StyledRangeInput");
var _propTypes = require("./propTypes");
var _utils = require("../../utils");
var _excluded = ["a11yTitle", "color", "focus", "focusIndicator", "name", "onChange", "onFocus", "onBlur", "value", "step", "min", "max"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var RangeInput = exports.RangeInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useState = (0, _react.useState)(focusProp),
    focus = _useState[0],
    setFocus = _useState[1];
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
    if (x !== null && y !== null) {
      var handleScrollTo = function handleScrollTo() {
        return window.scrollTo(x, y);
      };
      window.addEventListener('scroll', handleScrollTo);
      return function () {
        return window.removeEventListener('scroll', handleScrollTo);
      };
    }
    return undefined;
  }, [scroll]);
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
    value: value || ''
  }, rest, {
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
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onWheel: handleOnWheel,
    step: step,
    type: "range",
    min: min,
    max: max
  }));
});
RangeInput.displayName = 'RangeInput';
RangeInput.propTypes = _propTypes.RangeInputPropTypes;