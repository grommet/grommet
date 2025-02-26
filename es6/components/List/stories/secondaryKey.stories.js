import React from 'react';
import { Box, List } from 'grommet';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];
for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}
export var SecondaryKey = function SecondaryKey() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    primaryKey: "entry",
    secondaryKey: "location"
  }));
};
SecondaryKey.storyName = 'Secondary key';
export default {
  title: 'Visualizations/List/Secondary key'
};