import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var LabelledMeter = function LabelledMeter() {
  var meterValue = 30;
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Stack, {
    anchor: "center"
  }, /*#__PURE__*/React.createElement(Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: meterValue
    }],
    size: "xsmall",
    thickness: "small"
  }), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xlarge",
    weight: "bold"
  }, meterValue), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "%")))));
};

storiesOf('Meter', module).add('Labelled', function () {
  return /*#__PURE__*/React.createElement(LabelledMeter, null);
});