import React from 'react';
import { Box, Grommet, RangeInput } from 'grommet';
import { grommet } from 'grommet/themes';
var customThemeRangeInput = {
  rangeInput: {
    disabled: {
      track: {
        color: '#2196f3'
      },
      thumb: {
        color: 'red'
      }
    }
  }
};
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    theme: customThemeRangeInput
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    disabled: true,
    value: 5,
    a11yTitle: "Select range value"
  }))), /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    disabled: true,
    value: 5,
    a11yTitle: "Select range value"
  }))));
};
export default {
  title: 'Input/RangeInput/Custom Themed/Disabled'
};