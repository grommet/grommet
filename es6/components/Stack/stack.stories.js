import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleStack = function SimpleStack() {
  return React.createElement(Grommet, null, React.createElement(Stack, {
    anchor: "center"
  }, React.createElement(Box, {
    pad: "large",
    background: "neutral-1"
  }), React.createElement(Box, {
    pad: "small",
    background: "accent-1"
  })));
};

var FillStack = function FillStack() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Stack, {
    fill: true
  }, React.createElement(Box, {
    background: "brand",
    fill: true
  }, "Test")));
};

storiesOf('Stack', module).add('Simple Stack', function () {
  return React.createElement(SimpleStack, null);
}).add('Fill Stack', function () {
  return React.createElement(FillStack, null);
});