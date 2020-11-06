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
    bounds: ['2018-09-08', '2020-12-13']
  })));
};
CustomSizeCalendar.story = {
  name: 'Heading size'
};