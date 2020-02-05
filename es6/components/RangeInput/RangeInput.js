function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { FormContext } from '../Form/FormContext';
import { StyledRangeInput } from './StyledRangeInput';
var RangeInput = forwardRef(function (_ref, ref) {
  var name = _ref.name,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["name", "onChange", "onFocus", "onBlur", "value"]);

  var formContext = useContext(FormContext);

  var _useState = useState(valueProp !== undefined ? valueProp : formContext && name && formContext.get(name) || ''),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    return setValue(valueProp);
  }, [valueProp]);
  useEffect(function () {
    if (formContext && name) setValue(formContext.get(name) || '');
  }, [formContext, name]);

  var _useState2 = useState(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  return React.createElement(StyledRangeInput, _extends({
    ref: ref,
    name: name,
    focus: focus,
    value: value
  }, rest, {
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: function onChange(event) {
      var nextValue = event.target.value;

      if (formContext && name) {
        formContext.set(name, nextValue);
      }

      if (_onChange) _onChange(event);
      setValue(nextValue);
    },
    type: "range"
  }));
});
RangeInput.displayName = 'RangeInput';
var RangeInputDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}

var RangeInputWrapper = RangeInputDoc || RangeInput;
export { RangeInputWrapper as RangeInput };