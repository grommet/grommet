import React from 'react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';
export var Analog = function Analog() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Clock, {
    type: "analog"
  })));
};
Analog.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};