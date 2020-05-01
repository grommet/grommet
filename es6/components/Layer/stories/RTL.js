import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

var RTLLayer = function RTLLayer() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    dir: "rtl"
  }, /*#__PURE__*/React.createElement(Layer, {
    position: "start",
    margin: {
      vertical: 'small',
      start: 'xlarge',
      end: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge"
  }, "text"))));
};

storiesOf('Layer', module).add('RTL', function () {
  return /*#__PURE__*/React.createElement(RTLLayer, null);
});