import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var FillCalendar = function FillCalendar() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    height: "large",
    width: "large",
    border: true
  }, /*#__PURE__*/React.createElement(Calendar, {
    fill: true,
    daysOfWeek: true
  }))));
};

storiesOf('Calendar', module).add('Fill', function () {
  return /*#__PURE__*/React.createElement(FillCalendar, null);
});