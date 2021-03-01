function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useState } from 'react';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { StyledTextArea } from './StyledTextArea';
var TextArea = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      fill = _ref.fill,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "fill", "focusIndicator", "name", "onBlur", "onChange", "onFocus", "onKeyDown", "value"]);

  var formContext = useContext(FormContext);

  var _formContext$useFormI = formContext.useFormInput(name, valueProp),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  return /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: function onEsc(event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    },
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(StyledTextArea, _extends({
    "aria-label": a11yTitle,
    ref: ref,
    name: name,
    fillArg: fill,
    focus: focus,
    value: value,
    focusIndicator: focusIndicator
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
      setValue(event.target.value);
      if (_onChange) _onChange(event);
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