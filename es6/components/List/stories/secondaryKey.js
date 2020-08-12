import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
export var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
export var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}

var SecondaryKeyList = function SecondaryKeyList() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    primaryKey: "entry",
    secondaryKey: "location"
  })));
};

storiesOf('List', module).add('secondaryKey', function () {
  return /*#__PURE__*/React.createElement(SecondaryKeyList, null);
});