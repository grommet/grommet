import React from 'react';
import { Box, List, Menu } from 'grommet';
import { More } from "grommet-icons/es6/icons/More";
var data = [];
for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}
export var Show = function Show() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "large",
    height: "small",
    overflow: "scroll"
  }, /*#__PURE__*/React.createElement(List, {
    data: data,
    action: function action(item, index) {
      return /*#__PURE__*/React.createElement(Menu, {
        key: index,
        icon: /*#__PURE__*/React.createElement(More, null),
        hoverIndicator: true,
        items: [{
          label: 'one'
        }]
      });
    },
    show: 30
  })));
};
export default {
  title: 'Visualizations/List/Show'
};