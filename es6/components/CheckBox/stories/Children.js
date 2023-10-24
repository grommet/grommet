import React from 'react';
import { Box, CheckBox } from 'grommet';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
export var Children = function Children() {
  var _React$useState = React.useState(false),
    checkedState = _React$useState[0],
    setChecked = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    name: "name",
    value: "option 1",
    checked: checkedState,
    onChange: function onChange(event) {
      return setChecked(event.target.checked);
    }
  }, function (_ref) {
    var checked = _ref.checked;
    return /*#__PURE__*/React.createElement(Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    });
  }));
};
export default {
  title: 'Input/CheckBox/Children'
};