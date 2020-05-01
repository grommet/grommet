import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var RangeCalendar = function RangeCalendar() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Calendar, {
    dates: [['2020-04-03', '2020-04-08']],
    range: true
  })));
};

storiesOf('Calendar', module).add('Range', function () {
  return /*#__PURE__*/React.createElement(RangeCalendar, null);
});