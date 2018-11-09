import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

var DigitalClock = function DigitalClock() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Clock, {
    type: "digital"
  }));
};

var AnalogClock = function AnalogClock() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Clock, {
    type: "analog"
  }));
};

storiesOf('Clock', module).add('Digital Clock', function () {
  return React.createElement(DigitalClock, null);
}).add('Analog Clock', function () {
  return React.createElement(AnalogClock, null);
});