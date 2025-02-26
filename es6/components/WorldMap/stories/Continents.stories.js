import React from 'react';
import { Box, WorldMap } from 'grommet';
export var Continents = function Continents() {
  var _React$useState = React.useState(),
    active = _React$useState[0],
    setActive = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    continents: [{
      name: 'Africa',
      color: 'graph-1',
      onClick: function onClick() {
        return setActive(!active);
      }
    }]
  }), active && /*#__PURE__*/React.createElement(Box, {
    margin: "large"
  }, "Africa"));
};
export default {
  title: 'Visualizations/WorldMap/Continents'
};