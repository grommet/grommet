function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var Example = function Example(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, item));
  })));
};

export var Marker = function Marker() {
  return /*#__PURE__*/React.createElement(Example, {
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
};
export default {
  title: 'Utilities/InfiniteScroll/Marker'
};