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
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Header, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Avatar, null), /*#__PURE__*/React.createElement(Anchor, {
    color: "white",
    href: "https://github.com/ShimiSun"
  }, "ShimiSun")), /*#__PURE__*/React.createElement(Nav, {
    direction: "row"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  }))));
};

storiesOf('Nav', module).add('On Header', function () {
  return /*#__PURE__*/React.createElement(OnHeader, null);
});