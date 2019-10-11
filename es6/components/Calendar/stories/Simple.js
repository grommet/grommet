import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleCalendar = function SimpleCalendar() {
  var _useState = useState(),
      date = _useState[0],
      setDate = _useState[1];

  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Calendar, {
    date: date,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13']
  })), React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Calendar, {
    date: date,
    daysOfWeek: true,
    onSelect: onSelect,
    size: "small",
    bounds: ['2018-09-08', '2020-12-13']
  })));
};

storiesOf('Calendar', module).add('Simple', function () {
  return React.createElement(SimpleCalendar, null);
});