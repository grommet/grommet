import React from 'react';
import { Box, Layer } from 'grommet';
export var RTLLayer = function RTLLayer() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Layer, {
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
    }, "text")))
    // </Grommet>
  );
};

RTLLayer.storyName = 'RTL';
RTLLayer.args = {
  dir: 'rtl'
};
export default {
  title: 'Layout/Layer/RTL'
};