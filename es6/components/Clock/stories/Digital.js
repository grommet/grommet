import React from 'react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';
export var Digital = function Digital() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Clock, {
    type: "digital"
  })));
};
Digital.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};