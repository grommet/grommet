import React from 'react';
import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';
export var RTLLayer = function RTLLayer() {
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
RTLLayer.storyName = 'RTL';
export default {
  title: 'Layout/Layer/RTL'
};