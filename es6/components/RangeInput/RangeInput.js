var _excluded = ["a11yTitle", "color", "focus", "focusIndicator", "name", "onChange", "onFocus", "onBlur", "value", "step", "min", "max"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useContext, useState, useCallback, useEffect } from 'react';
import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';
import { RangeInputPropTypes } from './propTypes';
import { useForwardedRef } from '../../utils';
var RangeInput = /*#__PURE__*/forwardRef(function (_ref, ref) {
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
  var formContext = useContext(FormContext);
  var _useState = useState(focusProp),
    focus = _useState[0],
    setFocus = _useState[1];
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];
  var _useState2 = useState({
      x: null,
      y: null
    }),
    scroll = _useState2[0],
    setScroll = _useState2[1];
  var rangeInputRef = useForwardedRef(ref);
  useEffect(function () {
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
  var setRangeInputValue = useCallback(function (nextValue) {
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
  return /*#__PURE__*/React.createElement(StyledRangeInput, _extends({
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
RangeInput.propTypes = RangeInputPropTypes;
export { RangeInput };