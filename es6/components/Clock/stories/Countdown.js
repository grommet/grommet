import React from 'react';
import { Box, Clock } from 'grommet';
export var Countdown = function Countdown() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Clock, {
      type: "digital",
      time: "PT0H0M20S",
      run: "backward"
    }))
    // </Grommet>
  );
};

Countdown.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Clock/Countdown'
};