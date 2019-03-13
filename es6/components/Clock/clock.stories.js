import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';
var CustomThemeAnalogClock = {
  clock: {
    analog: {
      size: {
        medium: '200px'
      },
      hour: {
        width: '8px',
        shape: 'square',
        color: 'accent-1',
        size: '30px'
      },
      minute: {
        size: '12px',
        width: '6px',
        color: 'grey'
      },
      second: {
        width: '4px',
        color: 'brand',
        size: '5px'
      }
    }
  }
};

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

var AnalogClock = function AnalogClock() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Clock, {
    type: "analog"
  })));
};

var CustomAnalogClock = function CustomAnalogClock() {
  return React.createElement(Grommet, {
    theme: CustomThemeAnalogClock
  }, React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Clock, {
    type: "analog"
  })));
};

storiesOf('Clock', module).add('Digital', function () {
  return React.createElement(DigitalClock, null);
}).add('Analog', function () {
  return React.createElement(AnalogClock, null);
}).add('Custom Analog', function () {
  return React.createElement(CustomAnalogClock, null);
});