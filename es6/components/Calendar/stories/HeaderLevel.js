import React, { useState } from 'react';
import { Box, Calendar } from 'grommet';
export var HeaderLevel = function HeaderLevel() {
  var _useState = useState(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Calendar, {
      date: date,
      daysOfWeek: true,
      onSelect: onSelect,
      level: 2,
      bounds: ['2020-09-08', '2025-12-13']
    })))
    // </Grommet>
  );
};
HeaderLevel.storyName = 'Heading level';
export default {
  title: 'Visualizations/Calendar/Heading level'
};