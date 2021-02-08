import React from 'react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';
export var Countdown = function Countdown() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Clock, {
    type: "digital",
    time: "PT0H0M20S",
    run: "backward"
  })));
};
Countdown.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Clock/Countdown'
};