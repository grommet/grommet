import React from 'react';
import { Box, List, Text } from 'grommet';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];
for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}
export var RenderedList = function RenderedList() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    primaryKey: function primaryKey(item) {
      return /*#__PURE__*/React.createElement(Text, {
        key: item.entry,
        size: "large",
        weight: "bold"
      }, item.entry);
    },
    secondaryKey: function secondaryKey(item) {
      return /*#__PURE__*/React.createElement(Text, {
        key: item.location,
        size: "small",
        color: "dark-4"
      }, item.location);
    },
    itemKey: function itemKey(item) {
      return item.entry;
    }
  }));
};
RenderedList.storyName = 'Key render';
export default {
  title: 'Visualizations/List/Key render'
};