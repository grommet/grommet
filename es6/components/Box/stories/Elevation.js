import React from 'react';
import { Box, Text } from 'grommet';
export var ElevationBox = function ElevationBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small",
      align: "start"
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      background: "dark-1",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "dark on white"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "dark on dark"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      background: "light-1",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "light on dark"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      elevation: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "light on light"))))))
    // </Grommet>
  );
};

ElevationBox.storyName = 'Elevation';
export default {
  title: 'Layout/Box/Elevation'
};