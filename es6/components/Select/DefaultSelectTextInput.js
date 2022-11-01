var _excluded = ["disabled", "id"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef } from 'react';
import { SelectTextInput } from './StyledSelect';
export var DefaultSelectTextInput = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var disabled = _ref.disabled,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(SelectTextInput
  // When Select is disabled, we want to show a default cursor
  // but not have disabled styling come from TextInput
  // Disabled can be a bool or an array of options to disable.
  // We only want to disable the TextInput if the control
  // button should be disabled which occurs when disabled
  // equals true.
  , _extends({
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
    id: id ? id + "__input" : undefined,
    ref: ref
  }, rest, {
    tabIndex: "-1",
    type: "text",
    plain: true,
    readOnly: true
  }));
});