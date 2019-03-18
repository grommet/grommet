import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var RangeCalendar = function RangeCalendar() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Calendar, {
    range: true
  })));
};

storiesOf('Calendar', module).add('Range', function () {
  return React.createElement(RangeCalendar, null);
});