import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

var Example = function Example() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Clock, {
    type: "digital",
    time: "PT0H0M20S",
    run: "backward"
  })));
};

storiesOf('Clock', module).add('Countdown', function () {
  return React.createElement(Example, null);
}, {
  chromatic: {
    disable: true
  }
});