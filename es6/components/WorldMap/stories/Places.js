import React from 'react';
import { Box, Grommet, WorldMap } from 'grommet';
import { grommet } from 'grommet/themes';
export var Places = function Places() {
  var _React$useState = React.useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(WorldMap, {
    places: [{
      name: 'Sydney',
      location: [-33.8830555556, 151.216666667],
      color: 'graph-1',
      onClick: function onClick() {
        return setActive(!active);
      }
    }]
  }), active && /*#__PURE__*/React.createElement(Box, {
    margin: "large"
  }, "Sydney")));
};