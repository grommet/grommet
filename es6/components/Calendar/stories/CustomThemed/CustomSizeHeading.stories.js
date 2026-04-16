import React, { useState } from 'react';
import { deepMerge } from 'grommet/utils';
import { Box, Calendar, Grommet, grommet } from 'grommet';
var customHeading = deepMerge(grommet, {
  calendar: {
    heading: {
      level: '3'
    }
  }
});
var reference = '2026-04-12T21:09:16.501Z';
var end = new Date(reference);
var start = new Date(end.getTime() - 1000 * 60 * 60 * 24 * 90); // 90 days ago
var bounds = [start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate(), end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate()];
export var CustomSizeCalendar = function CustomSizeCalendar() {
  var _useState = useState(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customHeading
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    date: date,
    onSelect: onSelect,
    bounds: bounds,
    reference: reference
  })));
};
CustomSizeCalendar.storyName = 'Heading size';
export default {
  title: 'Visualizations/Calendar/Custom Themed/Heading size'
};