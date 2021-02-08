import React from 'react';
import { Grommet, Box, List, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}

export var RenderedList = function RenderedList() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    primaryKey: function primaryKey(item) {
      return /*#__PURE__*/React.createElement(Text, {
        size: "large",
        weight: "bold"
      }, item.entry);
    },
    secondaryKey: function secondaryKey(item) {
      return /*#__PURE__*/React.createElement(Text, {
        size: "small",
        color: "dark-4"
      }, item.location);
    }
  })));
};
RenderedList.storyName = 'Key render';
export default {
  title: 'Visualizations/List/Key render'
};