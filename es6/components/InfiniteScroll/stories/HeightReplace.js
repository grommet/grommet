import React from 'react';
import { grommet } from 'grommet/themes';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(240).fill().map(function (_, i) {
  return i + 1;
});
export var HeightReplace = function HeightReplace() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: allItems,
    replace: true
  }, function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      height: item <= 25 ? 'xsmall' : 'xxsmall',
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, "item ", item));
  })));
};
HeightReplace.storyName = 'Variable item height with replace';
HeightReplace.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Utilities/InfiniteScroll/Variable item height with replace'
};