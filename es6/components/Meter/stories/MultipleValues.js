import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var MultipleValues = function MultipleValues() {
  var total = 100;

  var _useState = useState(),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = useState(),
      label = _useState2[0],
      setLabel = _useState2[1];

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
      value: 60,
      onHover: function onHover(over) {
        setActive(over ? 60 : 0);
        setLabel(over ? 'in use' : undefined);
      }
    }, {
      value: 30,
      onHover: function onHover(over) {
        setActive(over ? 30 : 0);
        setLabel(over ? 'available' : undefined);
      }
    }],
    max: 100,
    size: "small",
    thickness: "medium"
  }), React.createElement(Box, {
    align: "center"
  }, React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, React.createElement(Text, {
    size: "xxlarge",
    weight: "bold"
  }, active || total), React.createElement(Text, null, "GB")), React.createElement(Text, null, label || 'total')))));
};

storiesOf('Meter', module).add('Multiple Values', function () {
  return React.createElement(MultipleValues, null);
});