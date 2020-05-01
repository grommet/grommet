import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Clock } from 'grommet';
import { grommet } from 'grommet/themes';

var DigitalClock = function DigitalClock() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Clock, {
    type: "digital"
  })));
};

storiesOf('Clock', module).add('Digital', function () {
  return /*#__PURE__*/React.createElement(DigitalClock, null);
}, {
  chromatic: {
    disable: true
  }
});