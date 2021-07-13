import React from 'react';
import { Grommet, Box, List, Layer, Button, Text } from 'grommet';
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

export var OnClickItemList = function OnClickItemList() {
  var _React$useState = React.useState(),
      clicked = _React$useState[0],
      setClicked = _React$useState[1];

  var _React$useState2 = React.useState(),
      show = _React$useState2[0],
      setShow = _React$useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: data.slice(0, 10),
    onClickItem: function onClickItem(event) {
      setShow(true);
      setClicked(event.item);
    }
  }), show && /*#__PURE__*/React.createElement(Layer, {
    position: "center",
    onEsc: function onEsc() {
      return setShow(false);
    },
    onClickOutside: function onClickOutside() {
      return setShow(false);
    }
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, clicked && JSON.stringify(clicked, null, 2)), /*#__PURE__*/React.createElement(Button, {
    margin: {
      top: 'medium'
    },
    label: "close",
    onClick: function onClick() {
      return setShow(false);
    }
  })))));
};
OnClickItemList.storyName = 'onClickItem';
OnClickItemList.parameters = {
  // chromatic disabled because snapshot is covered by jest testing
  // and snapshot is the same as selection
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/List/onClickItem'
};