import React from 'react';
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Menu as MenuIcon } from "grommet-icons/es6/icons/Menu";
import { grommet } from 'grommet/themes';
export var Responsive = function Responsive() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Header, {
    background: "light-4",
    pad: "medium",
    height: "xsmall"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "https://tools.grommet.io/",
    icon: /*#__PURE__*/React.createElement(GrommetIcon, {
      color: "brand"
    }),
    label: "Grommet Tools"
  }), /*#__PURE__*/React.createElement(ResponsiveContext.Consumer, null, function (size) {
    return size === 'small' ? /*#__PURE__*/React.createElement(Box, {
      justify: "end"
    }, /*#__PURE__*/React.createElement(Menu, {
      a11yTitle: "Navigation Menu",
      dropProps: {
        align: {
          top: 'bottom',
          right: 'right'
        }
      },
      icon: /*#__PURE__*/React.createElement(MenuIcon, {
        color: "brand"
      }),
      items: [{
        label: /*#__PURE__*/React.createElement(Box, {
          pad: "small"
        }, "Grommet.io"),
        href: 'https://v2.grommet.io/'
      }, {
        label: /*#__PURE__*/React.createElement(Box, {
          pad: "small"
        }, "Feedback"),
        href: 'https://github.com/grommet/grommet/issues'
      }]
    })) : /*#__PURE__*/React.createElement(Box, {
      justify: "end",
      direction: "row",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Anchor, {
      href: "https://v2.grommet.io/",
      label: "Grommet.io"
    }), /*#__PURE__*/React.createElement(Anchor, {
      href: "https://github.com/grommet/grommet/issues",
      label: "Feedback"
    }));
  })));
};
export default {
  title: 'Layout/Header/Responsive'
};