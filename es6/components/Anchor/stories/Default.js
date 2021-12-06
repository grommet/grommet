import React from 'react';
import { Anchor, Box } from 'grommet';

var DefaultAnchor = function DefaultAnchor() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "#"
  }, "Link"));
};

export var Default = function Default() {
  return /*#__PURE__*/React.createElement(DefaultAnchor, null);
};
Default.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Anchor/Default'
};