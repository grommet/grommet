import React from 'react';
import { Grid, Notification } from 'grommet';
import { Cards } from '../Cards';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Notification, {
    status: "info",
    message: "Cards is in 'beta'. The API surface is subject to change."
  }), /*#__PURE__*/React.createElement(Cards, {
    a11yTitle: "Locations",
    data: locations
  }));
};
export default {
  title: 'Visualizations/Cards/Simple'
};