import React, { useState } from 'react';
import { Box, Calendar } from 'grommet';
export var Simple = function Simple() {
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
      size: "small",
      bounds: ['2020-09-08', '2025-12-13']
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Calendar/Simple'
};