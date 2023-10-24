import React from 'react';
import { Box, Meter } from 'grommet';
export var SemiCircle = function SemiCircle() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Meter, {
      size: "medium",
      type: "semicircle",
      background: "light-2",
      value: 60
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Semi Circle'
};