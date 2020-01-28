function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { StyledTextArea } from './StyledTextArea';
var TextArea = forwardRef(function (_ref, ref) {
  var fill = _ref.fill,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["fill", "name", "onBlur", "onChange", "onFocus", "value"]);

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

  return React.createElement(Keyboard, {
    onEsc: function onEsc(event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  }, React.createElement(StyledTextArea, _extends({
    ref: ref,
    name: name,
    fillArg: fill,
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
      if (formContext && name) {
        formContext.set(name, event.target.value);
      }

      if (_onChange) {
        _onChange(event);
      }
    }
  })));
});
TextArea.displayName = 'TextArea';
var TextAreaDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextAreaDoc = require('./doc').doc(TextArea);
}

var TextAreaWrapper = TextAreaDoc || TextArea;
export { TextAreaWrapper as TextArea };