import React from 'react';
import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var sizes = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];
export var All = function All() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(React.Fragment, null, sizes.map(function (size) {
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
  }, "This is a long truncated string of text that is aligned to the end."))));
};
export default {
  title: 'Type/Text/All'
};