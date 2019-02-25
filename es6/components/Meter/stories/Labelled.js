import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var LabelledMeter = function LabelledMeter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Stack, {
    anchor: "center"
  }, React.createElement(Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: 30
    }],
    size: "xsmall",
    thickness: "small"
  }), React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, React.createElement(Text, {
    size: "xlarge",
    weight: "bold"
  }, "30"), React.createElement(Text, {
    size: "small"
  }, "%")))));
};

storiesOf('Meter', module).add('Labelled', function () {
  return React.createElement(LabelledMeter, null);
});