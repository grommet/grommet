import React from 'react';
import { Box, Grommet, List, Menu } from 'grommet';
import { grommet } from 'grommet/themes';
import { More } from "grommet-icons/es6/icons/More";
var data = [];

for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

export var Show = function Show() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
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