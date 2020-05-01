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
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    size: "xxlarge",
    weight: "bold"
  }, active || total), /*#__PURE__*/React.createElement(Text, null, "GB")), /*#__PURE__*/React.createElement(Text, null, label || 'total')))));
};

storiesOf('Meter', module).add('Multiple Values', function () {
  return /*#__PURE__*/React.createElement(MultipleValues, null);
});