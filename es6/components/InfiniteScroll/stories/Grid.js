import React from 'react';
import { Grid, Box, Image, InfiniteScroll, Text } from 'grommet';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
export var GridInfiniteScroll = function GridInfiniteScroll() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
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
        src: "https://via.placeholder.com/350x150",
        alt: "Placeholder Image"
      }), /*#__PURE__*/React.createElement(Text, null, item));
    }))
    // </Grommet>
  );
};

GridInfiniteScroll.storyName = 'Grid';
export default {
  title: 'Utilities/InfiniteScroll/Grid'
};