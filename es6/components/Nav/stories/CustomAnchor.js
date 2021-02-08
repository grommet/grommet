import React from 'react';
import { Anchor, Box, Grommet, Main, Nav } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var navItems = [{
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
var customTheme = deepMerge(grommet, {
  anchor: {
    textDecoration: 'none',
    fontWeight: 500,
    color: {
      dark: 'white',
      light: 'neutral-2'
    },
    hover: {
      textDecoration: 'none',
      fontWeight: 700
    }
  }
});

var CustomAnchorNav = function CustomAnchorNav() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "large",
    fill: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    width: "small",
    margin: {
      right: 'large'
    }
  }, navItems.map(function (item) {
    return /*#__PURE__*/React.createElement(Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  })), /*#__PURE__*/React.createElement(Main, null, "Place main content here"))));
};

export var CustomAnchor = function CustomAnchor() {
  return /*#__PURE__*/React.createElement(CustomAnchorNav, null);
};
CustomAnchor.storyName = 'Custom anchor';
export default {
  title: 'Controls/Nav/Custom anchor'
};