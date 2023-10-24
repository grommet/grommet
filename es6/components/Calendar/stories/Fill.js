import React from 'react';
import { Box, Calendar } from 'grommet';
export var Fill = function Fill() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      height: "large",
      width: "large",
      border: true
    }, /*#__PURE__*/React.createElement(Calendar, {
      fill: true,
      daysOfWeek: true
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Fill'
};