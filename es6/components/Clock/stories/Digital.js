import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

var DigitalClock = function DigitalClock() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Clock, {
    type: "digital"
  })));
};

storiesOf('Clock', module).add('Digital', function () {
  return React.createElement(DigitalClock, null);
}, {
  chromatic: {
    disable: true
  }
});