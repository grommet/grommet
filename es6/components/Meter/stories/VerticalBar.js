import React from 'react';
import { Box, Meter } from 'grommet';
export var VerticalBar = function VerticalBar() {
  var value = 30;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Meter, {
      type: "bar",
      value: value,
      direction: "vertical"
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Vertical Bar'
};