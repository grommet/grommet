import React from 'react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, null)));
};
Simple.story = {
  parameters: {
    // chromatic disabled because snapshot is the same as SelectPlace
    chromatic: {
      disable: true
    }
  }
};