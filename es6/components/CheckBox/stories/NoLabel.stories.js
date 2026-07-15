var _excluded = ["checked"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Box, CheckBox } from 'grommet';
var SimpleCheckBox = function SimpleCheckBox(_ref) {
  var checkedProp = _ref.checked,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(!!checkedProp),
    checked = _useState[0],
    setChecked = _useState[1];
  var onChange = function onChange(event) {
    return setChecked(event.target.checked);
  };
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, _extends({}, rest, {
    checked: checked,
    onChange: onChange
  })));
};
export var NoLabel = function NoLabel() {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, {
    a11yTitle: "Checkbox without a label"
  });
};
NoLabel.storyName = 'No label';
export default {
  title: 'Input/CheckBox/No label'
};