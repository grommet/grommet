import React from 'react';
import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  var _React$useState = React.useState(5),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    value: value,
    onChange: onChange
  })));
};
export default {
  title: 'Input/RangeInput/Simple'
};