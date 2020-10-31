import React from 'react';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
export var Basic = function Basic() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    direction: "row",
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: src
  }), /*#__PURE__*/React.createElement(Avatar, {
    background: "accent-4"
  }, /*#__PURE__*/React.createElement(Favorite, {
    color: "accent-2"
  })), /*#__PURE__*/React.createElement(Avatar, {
    background: "dark-2"
  }, "R"), /*#__PURE__*/React.createElement(Avatar, {
    background: "brand"
  }, "SY")));
};