import React from 'react';
import { Box, Text } from 'grommet';
var sizes = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];
export var All = function All() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizes.map(function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      size: size
    }, "Text " + size));
  }), /*#__PURE__*/React.createElement(Box, {
    background: "light-3",
    align: "end",
    width: "small",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    truncate: true
  }, "This is a long truncated string of text that is aligned to the end.")), /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "brand"
  }, "Colored Text")));
};
export default {
  title: 'Type/Text/All'
};