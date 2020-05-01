import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Round = function Round() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    alignContent: "center",
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src,
    round: false
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src,
    round: "xsmall"
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src,
    round: "small"
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src,
    round: "medium"
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src,
    round: "large"
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "large",
    src: src
  })));
};

storiesOf('Avatar', module).add('Round', function () {
  return /*#__PURE__*/React.createElement(Round, null);
});