import React from 'react';
import { Box, List } from 'grommet';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var Basic = function Basic() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    a11yTitle: "Locations",
    data: locations
  }));
};
export default {
  title: 'Visualizations/List/Basic'
};