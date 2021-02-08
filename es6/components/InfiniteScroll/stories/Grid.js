import React from 'react';
import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
export var GridInfiniteScroll = function GridInfiniteScroll() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "xsmall",
    rows: "small"
  }, /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: allItems,
    step: 12
  }, function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      as: "article",
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Image, {
      src: "https://via.placeholder.com/350x150"
    }), /*#__PURE__*/React.createElement(Text, null, item));
  })));
};
GridInfiniteScroll.storyName = 'Grid';
export default {
  title: 'Utilities/InfiniteScroll/Grid'
};