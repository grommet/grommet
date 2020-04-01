import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  var _useState = useState([]),
      dates = _useState[0],
      setDates = _useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Calendar, {
    dates: dates,
    onSelect: function onSelect(date) {
      var nextDates = [].concat(dates);
      var index = nextDates.indexOf(date);

      if (index === -1) {
        nextDates.push(date);
      } else {
        nextDates.splice(index, 1);
      }

      setDates(nextDates);
      console.log('!!! select', date, nextDates);
    },
    bounds: ['2018-09-08', '2020-12-13']
  })));
};

storiesOf('Calendar', module).add('Multiple', function () {
  return React.createElement(Example, null);
});