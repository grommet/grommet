import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Sizes = function Sizes() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    pad: "large"
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
  })));
};

storiesOf('Avatar', module).add('Sizes', function () {
  return /*#__PURE__*/React.createElement(Sizes, null);
});