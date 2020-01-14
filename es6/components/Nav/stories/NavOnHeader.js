import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet, Header, Nav } from 'grommet';
import { grommet } from 'grommet/themes';
import { Avatar } from '../../Header/stories/Simple';
var items = [{
  label: 'HTML',
  href: '#'
}, {
  label: 'JS',
  href: '#'
}, {
  label: 'CSS',
  href: '#'
}, {
  label: 'REACT',
  href: '#'
}];

var OnHeader = function OnHeader() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Header, {
    background: "dark-1",
    pad: "medium"
  }, React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, React.createElement(Avatar, null), React.createElement(Anchor, {
    color: "white",
    href: "https://github.com/ShimiSun"
  }, "ShimiSun")), React.createElement(Nav, {
    direction: "row"
  }, items.map(function (item) {
    return React.createElement(Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  }))));
};

storiesOf('Nav', module).add('On Header', function () {
  return React.createElement(OnHeader, null);
});