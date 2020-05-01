import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleStack = function SimpleStack() {
  return /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    anchor: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    background: "neutral-1"
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: "accent-1"
  })));
};

var FillStack = function FillStack() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Stack, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    background: "brand",
    fill: true
  }, "Test")));
};

storiesOf('Stack', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleStack, null);
}).add('Fill', function () {
  return /*#__PURE__*/React.createElement(FillStack, null);
});