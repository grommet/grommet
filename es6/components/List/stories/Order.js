import React, { useState } from 'react';
import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var Order = function Order() {
  var _useState = useState(locations),
      ordered = _useState[0],
      setOrder = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    role: "application"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: ordered,
    onOrder: setOrder
  })));
};
export default {
  title: 'Visualizations/List/Order'
};