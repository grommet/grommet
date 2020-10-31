import React from 'react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var DefaultAnchor = function DefaultAnchor() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "#"
  }, "Link")));
};

export var Default = function Default() {
  return /*#__PURE__*/React.createElement(DefaultAnchor, null);
};
Default.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};