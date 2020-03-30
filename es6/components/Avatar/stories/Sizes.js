import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Sizes = function Sizes() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    direction: "row",
    pad: "large"
  }, React.createElement(Avatar, {
    size: "small",
    src: src
  }), React.createElement(Avatar, {
    size: "medium",
    src: src
  }), React.createElement(Avatar, {
    size: "large",
    src: src
  }), React.createElement(Avatar, {
    size: "xlarge",
    src: src
  })));
};

storiesOf('Avatar', module).add('Sizes', function () {
  return React.createElement(Sizes, null);
});