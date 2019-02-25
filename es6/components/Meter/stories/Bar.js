import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

var BarMeter = function BarMeter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: 30
    }]
  })));
};

storiesOf('Meter', module).add('Bar', function () {
  return React.createElement(BarMeter, null);
});