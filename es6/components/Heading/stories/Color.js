import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

var Color = function Color() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Heading, {
    color: "accent-1"
  }, "Colored Heading"));
};

storiesOf('Heading', module).add('Color', function () {
  return React.createElement(Color, null);
});