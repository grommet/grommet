import React from 'react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';
export var SemiCircle = function SemiCircle() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Meter, {
    size: "medium",
    type: "semicircle",
    background: "light-2",
    value: 60
  })));
};
export default {
  title: 'Visualizations/Meter/Semi Circle'
};