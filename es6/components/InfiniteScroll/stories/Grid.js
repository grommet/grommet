function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
export var GridInfiniteScroll = function GridInfiniteScroll(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "xsmall",
    rows: "small"
  }, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
    items: allItems,
    step: 12
  }, rest), function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      as: "article",
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Image, {
      src: "https://via.placeholder.com/350x150"
    }), /*#__PURE__*/React.createElement(Text, null, item));
  })));
};
export var GridWithShow = function GridWithShow() {
  return /*#__PURE__*/React.createElement(GridInfiniteScroll, {
    show: 78
  });
};
GridInfiniteScroll.story = {
  name: 'Grid'
};
GridWithShow.story = {
  name: 'Grid with show item 77'
};