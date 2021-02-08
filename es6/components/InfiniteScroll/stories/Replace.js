import React from 'react';
import { grommet } from 'grommet/themes';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});
export var Replace = function Replace() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: allItems,
    replace: true
  }, function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, item));
  }));
};
Replace.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Utilities/InfiniteScroll/Replace'
};