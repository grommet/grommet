import React from 'react';
import { storiesOf } from '@storybook/react';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Basic = function Basic() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    justify: "center",
    direction: "row",
    gap: "small",
    pad: "large"
  }, React.createElement(Avatar, {
    src: src
  }), React.createElement(Avatar, {
    background: "accent-4"
  }, React.createElement(Favorite, {
    color: "accent-2"
  })), React.createElement(Avatar, {
    background: "dark-2"
  }, "R"), React.createElement(Avatar, {
    background: "brand"
  }, "SY")));
};

storiesOf('Avatar', module).add('Basic', function () {
  return React.createElement(Basic, null);
});