import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var Color = function Color() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Text, {
    color: "accent-1"
  }, "Colored Text"));
};

storiesOf('Text', module).add('Color', function () {
  return React.createElement(Color, null);
});