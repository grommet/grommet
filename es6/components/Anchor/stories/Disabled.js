import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Disabled = function Disabled() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Box, {
    margin: "small"
  }, React.createElement(Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }))));
};

storiesOf('Anchor', module).add('Disabled', function () {
  return React.createElement(Disabled, null);
});