import React from 'react';
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Sizes = function Sizes() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: "small",
    src: src
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "medium",
    src: src
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "xlarge",
    src: src
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    pad: "large",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Avatar, {
    background: "dark-2",
    size: "small"
  }, "S"), /*#__PURE__*/React.createElement(Avatar, {
    background: "dark-2",
    size: "medium"
  }, "LS"), /*#__PURE__*/React.createElement(Avatar, {
    background: "dark-2",
    size: "large"
  }, "JF"), /*#__PURE__*/React.createElement(Avatar, {
    background: "dark-2",
    size: "xlarge"
  }, "SY")));
};