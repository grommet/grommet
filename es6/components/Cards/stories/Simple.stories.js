import React from 'react';
import { Grid } from 'grommet';
import { Cards } from '../Cards';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Cards, {
    a11yTitle: "Locations",
    data: locations
  }));
};
export default {
  title: 'Visualizations/Cards/Simple'
};