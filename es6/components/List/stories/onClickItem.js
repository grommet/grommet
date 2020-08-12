import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length],
    date: "2018-07-" + (i % 30 + 1),
    percent: i % 11 * 10,
    paid: (i + 1) * 17 % 1000
  });
}

var OnClickItemList = function OnClickItemList() {
  var _React$useState = React.useState(),
      clicked = _React$useState[0],
      setClicked = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    onClickItem: function onClickItem(event) {
      return setClicked(event.item);
    }
  }), clicked && JSON.stringify(clicked, null, 2)));
};

storiesOf('List', module).add('onClickItem', function () {
  return /*#__PURE__*/React.createElement(OnClickItemList, null);
});