import React, { useState } from 'react';
import { CaretDown } from "grommet-icons/es6/icons/CaretDown";
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
export var ValueLabel = function ValueLabel() {
  var options = ['one', 'two'];

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setValue(option);
    },
    plain: true,
    valueLabel: /*#__PURE__*/React.createElement(Box, {
      background: "brand",
      width: "small",
      round: "small",
      overflow: "hidden",
      align: "center"
    }, value || 'Select...'),
    icon: /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(CaretDown, {
      color: "black"
    }))
  })));
};