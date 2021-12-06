import React from 'react';
import { Anchor, Box, Paragraph } from 'grommet';

var InlineAnchor = function InlineAnchor() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Paragraph, null, "This is ", /*#__PURE__*/React.createElement(Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text."));
};

export var Inline = function Inline() {
  return /*#__PURE__*/React.createElement(InlineAnchor, null);
};
export default {
  title: 'Controls/Anchor/Inline'
};