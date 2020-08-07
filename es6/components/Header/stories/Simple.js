import React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Anchor, Nav, Grommet, Header } from 'grommet';
import { grommet } from 'grommet/themes';
var gravatarLink = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Header, {
    background: "light-4",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: gravatarLink
  }), /*#__PURE__*/React.createElement(Nav, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(Anchor, {
    label: "Home",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Profile",
    href: "#"
  }))));
};

storiesOf('Header', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(Simple, null);
});