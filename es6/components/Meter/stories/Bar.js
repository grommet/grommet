import React from 'react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';
export var Bar = function Bar() {
  var value = 30;
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "bar",
    value: value
  })));
};
export default {
  title: 'Visualizations/Meter/Bar'
};