function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useState } from 'react';
import { Keyboard } from '../Keyboard';
import { StyledTextArea } from './StyledTextArea';
var TextArea = forwardRef(function (_ref, ref) {
  var fill = _ref.fill,
      _onBlur = _ref.onBlur,
      _onFocus = _ref.onFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["fill", "onBlur", "onFocus"]);

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  return React.createElement(Keyboard, {
    onEsc: function onEsc(event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  }, React.createElement(StyledTextArea, _extends({
    ref: ref,
    fillArg: fill,
    focus: focus
  }, rest, {
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
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