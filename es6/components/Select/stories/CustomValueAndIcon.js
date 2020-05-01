function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { CaretDown } from "grommet-icons/es6/icons/CaretDown";
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

var CustomSelect = function CustomSelect(_ref) {
  var rest = _extends({}, _ref);

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
  }, /*#__PURE__*/React.createElement(Select, _extends({
    id: "select",
    name: "select",
    placeholder: "Select",
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
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
  }, rest))));
};

storiesOf('Select', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(CustomSelect, null);
});