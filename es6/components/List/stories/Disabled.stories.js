import React from 'react';
import { Box, List } from 'grommet';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var disabledLocations = ['Fort Collins', 'Palo Alto'];
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    a11yTitle: "Locations",
    data: locations,
    disabled: disabledLocations,
    onClickItem: function onClickItem(e) {
      console.log(e);
    }
  }));
};
export default {
  title: 'Visualizations/List/Disabled'
};