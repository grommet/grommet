function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet, Header } from 'grommet';
import { grommet } from 'grommet/themes';
export var Avatar = function Avatar(_ref) {
  var rest = _extends({}, _ref);

  return React.createElement(Box, _extends({
    height: "xxsmall",
    width: "xxsmall",
    round: "full" // eslint-disable-next-line max-len
    ,
    background: "url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
  }, rest));
};

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Header, {
    background: "light-4",
    pad: "small"
  }, React.createElement(Avatar, null), React.createElement(Box, {
    direction: "row",
    gap: "medium"
  }, React.createElement(Anchor, {
    label: "Home",
    href: "#"
  }), React.createElement(Anchor, {
    label: "Profile",
    href: "#"
  }))));
};

storiesOf('Header', module).add('Simple', function () {
  return React.createElement(Simple, null);
});