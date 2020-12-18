import React from 'react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';
export var Color = function Color() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    color: "graph-1"
  })));
};
Color.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};