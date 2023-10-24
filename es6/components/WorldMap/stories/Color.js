import React from 'react';
import { Box, WorldMap } from 'grommet';
export var Color = function Color() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    color: "graph-1"
  }));
};
Color.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/WorldMap/Color'
};