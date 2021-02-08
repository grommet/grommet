import React, { useState } from 'react';
import { Box, Button, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
export var Controlled = function Controlled() {
  var options = ['one', 'two'];

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(false),
      open = _useState2[0],
      setOpen = _useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return setOpen(!open);
    },
    label: "Control the select"
  }), /*#__PURE__*/React.createElement(Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    open: open,
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    }
  })));
};
export default {
  title: 'Input/Select/Controlled'
};