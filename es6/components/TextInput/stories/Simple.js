import React from 'react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: value,
    onChange: onChange
  }))));
};
Simple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};