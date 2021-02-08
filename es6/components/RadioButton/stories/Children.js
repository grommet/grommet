import React from 'react';
import { Grommet, Box, Button, RadioButton } from 'grommet';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
import { grommet } from 'grommet/themes';
export var Children = function Children() {
  var _React$useState = React.useState(),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(RadioButton, {
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }, function (_ref) {
    var checked = _ref.checked;
    return /*#__PURE__*/React.createElement(Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    });
  }), /*#__PURE__*/React.createElement(Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  })));
};
export default {
  title: 'Input/RadioButton/Children'
};