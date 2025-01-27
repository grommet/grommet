var _excluded = ["disabled", "id"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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