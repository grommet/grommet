import React, { useState } from 'react';
import { Box, List } from 'grommet';
var locations = ['Los Angelos', 'Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'Pheonix', 'San Francisco', 'Trenton'];
var pinnedLocations = ['Los Angelos', 'Fort Collins', 'Palo Alto', 'Pheonix', 'Trenton'];
export var Pinned = function Pinned() {
  var _useState = useState(locations),
    ordered = _useState[0],
    setOrder = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    "aria-label": "pinned list",
    data: ordered,
    onOrder: setOrder,
    pinned: pinnedLocations
  }));
};
export default {
  title: 'Visualizations/List/Pinned'
};