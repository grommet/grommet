import React, { useState } from 'react';
import { Box, Calendar } from 'grommet';
var reference = '2026-04-12T21:09:16.501Z';
var end = new Date(reference);
var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 days ago
var bounds = [start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate(), end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()];
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
      bounds: bounds,
      reference: reference
    })))
    // </Grommet>
  );
};
HeaderLevel.storyName = 'Heading level';
export default {
  title: 'Visualizations/Calendar/Heading level'
};