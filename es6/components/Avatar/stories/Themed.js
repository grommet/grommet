import React from 'react';
import { storiesOf } from '@storybook/react';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Avatar, Box, Grommet } from 'grommet';
var theme = {
  avatar: {
    size: {
      myLarge: '70px'
    },
    text: {
      fontWeight: 700,
      extend: "font-family: Comic Sans MS; font-size: 30px"
    },
    extend: "border: 2px solid white; \n            box-shadow: 2px 2px 15px 1px white;"
  }
};

var Themed = function Themed() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    direction: "row",
    gap: "small",
    pad: "large",
    background: "dark-2"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: src,
    size: "myLarge"
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "myLarge",
    background: "accent-4"
  }, /*#__PURE__*/React.createElement(Favorite, {
    color: "accent-2",
    size: "36px"
  })), /*#__PURE__*/React.createElement(Avatar, {
    size: "myLarge",
    background: "dark-2"
  }, "R"), /*#__PURE__*/React.createElement(Avatar, {
    size: "myLarge",
    background: "brand"
  }, "SY")));
};

storiesOf('Avatar', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(Themed, null);
});