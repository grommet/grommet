import React from 'react';
import { Box, Calendar } from 'grommet';
export var Range = function Range() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Calendar, {
      date: [['2020-04-03', '2020-04-08']],
      range: true
    }))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Range'
};