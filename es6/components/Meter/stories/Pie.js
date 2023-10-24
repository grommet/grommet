import React from 'react';
import { Box, Meter } from 'grommet';
export var Pie = function Pie() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook8
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Meter, {
      type: "pie",
      background: "light-2",
      size: "small",
      values: [{
        value: 70
      }, {
        value: 20
      }, {
        value: 10
      }]
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Meter/Pie'
};