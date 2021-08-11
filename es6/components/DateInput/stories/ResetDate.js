import React from 'react';
import { Grommet, Box, DateInput, grommet } from 'grommet';
import { Button } from '../../Button';
var DATE = '2020-07-02T00:00:00-08:00';
var DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];
export var ResetDateWithString = function ResetDateWithString() {
  var _React$useState = React.useState(DATE),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "column",
    align: "center",
    justify: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(DateInput, {
    value: value,
    onChange: onChange,
    format: "mm/dd/yyyy"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Reset Date",
    fill: "vertical",
    onClick: function onClick() {
      return setValue('');
    },
    type: "button"
  })));
};
export var ResetDateWithArray = function ResetDateWithArray() {
  var _React$useState2 = React.useState(DATES),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onChange = function onChange(event) {
    return setValue(event.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "column",
    align: "center",
    justify: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(DateInput, {
    value: value,
    onChange: onChange,
    format: "mm/dd/yyyy"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Reset Date",
    fill: "vertical",
    onClick: function onClick() {
      return setValue([]);
    },
    type: "button"
  })));
};
ResetDateWithString.storyName = 'Reset date with string';
ResetDateWithArray.storyName = "Reset date with array";
export default {
  title: 'Input/DateInput/Reset date'
};