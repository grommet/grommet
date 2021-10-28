import React from 'react';
import { Box, WorldMap } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, null));
};
Simple.parameters = {
  // chromatic disabled because snapshot is the same as SelectPlace
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/WorldMap/Simple'
};