import React from 'react';
import { Grommet, Box, List, Menu } from 'grommet';
import { More } from "grommet-icons/es6/icons/More";
import { grommet } from 'grommet/themes';
var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

export var Action = function Action() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    pad: {
      left: 'small',
      right: 'none'
    },
    action: function action(item, index) {
      return /*#__PURE__*/React.createElement(Menu, {
        key: index,
        icon: /*#__PURE__*/React.createElement(More, null),
        hoverIndicator: true,
        items: [{
          label: 'one'
        }]
      });
    }
  })));
};
export default {
  title: 'Visualizations/List/Action'
};