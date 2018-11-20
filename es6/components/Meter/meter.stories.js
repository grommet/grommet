import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var BarMeter = function BarMeter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Meter, {
    type: "bar",
    background: "light-2",
    values: [{
      value: 30
    }]
  }));
};

var CircleMeter = function CircleMeter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: 30
    }]
  }));
};

var LabelledMeter = function LabelledMeter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "start"
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

storiesOf('Meter', module).add('Bar', function () {
  return React.createElement(BarMeter, null);
}).add('Circle', function () {
  return React.createElement(CircleMeter, null);
}).add('Labelled', function () {
  return React.createElement(LabelledMeter, null);
});