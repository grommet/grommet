import React, { useState } from 'react';
import { Box, List } from 'grommet';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var Order = function Order() {
  var _useState = useState(locations),
    ordered = _useState[0],
    setOrder = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    "aria-label": "order list",
    data: ordered,
    onOrder: setOrder
  }));
};
export default {
  title: 'Visualizations/List/Order'
};