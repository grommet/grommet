import React from 'react';
import { Anchor, Box, Paragraph } from 'grommet';
var SimpleAnchor = function SimpleAnchor() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "medium",
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "#"
  }, "Link"), /*#__PURE__*/React.createElement(Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "none"
  }, "This is ", /*#__PURE__*/React.createElement(Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text."));
};
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleAnchor, null);
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Anchor/Simple'
};