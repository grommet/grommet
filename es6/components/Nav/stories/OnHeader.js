import React from 'react';
import { Avatar, Anchor, Box, Header, Nav } from 'grommet';
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
var gravatarSrc = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
var OnHeaderNav = function OnHeaderNav() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Header, {
      background: "dark-1",
      pad: "small"
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Avatar, {
      src: gravatarSrc
    }), /*#__PURE__*/React.createElement(Anchor, {
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
    })))
    // </Grommet>
  );
};

export var OnHeader = function OnHeader() {
  return /*#__PURE__*/React.createElement(OnHeaderNav, null);
};
OnHeader.storyName = 'On Header';
export default {
  title: 'Controls/Nav/On Header'
};