import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var PlainLayer = function PlainLayer() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    background: "dark-3"
  }, React.createElement(Layer, {
    margin: "medium",
    plain: true
  }, React.createElement(Box, {
    pad: "large",
    border: {
      color: 'accent-1',
      size: 'large'
    }
  }, React.createElement(Text, {
    color: "accent-2"
  }, "Text")))));
};

storiesOf('Layer', module).add('Plain', function () {
  return React.createElement(PlainLayer, null);
});