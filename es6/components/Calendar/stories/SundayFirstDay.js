import React from 'react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes'; // When the first day of the month is Sunday, and the request of firstDayOfWeek
// is Monday, we are verifing we are not missing a week, issue 3253.

export var SundayFirstDayCalendar = function SundayFirstDayCalendar() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    firstDayOfWeek: 1,
    date: new Date(2019, 8, 2).toISOString()
  })));
};
SundayFirstDayCalendar.story = {
  name: '1st on Sunday'
};