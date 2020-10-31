import React from 'react';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { FacebookOption } from "grommet-icons/es6/icons/FacebookOption";
import { Instagram } from "grommet-icons/es6/icons/Instagram";
import { Twitter } from "grommet-icons/es6/icons/Twitter";
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

var Media = function Media() {
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "xxsmall",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Anchor, {
    a11yTitle: "Share feedback on Github",
    href: "https://www.instagram.com/",
    icon: /*#__PURE__*/React.createElement(Instagram, {
      color: "brand"
    })
  }), /*#__PURE__*/React.createElement(Anchor, {
    a11yTitle: "Chat with us on Slack",
    href: "https://www.facebook.com/",
    icon: /*#__PURE__*/React.createElement(FacebookOption, {
      color: "brand"
    })
  }), /*#__PURE__*/React.createElement(Anchor, {
    a11yTitle: "Follow us on Twitter",
    href: "https://twitter.com/",
    icon: /*#__PURE__*/React.createElement(Twitter, {
      color: "brand"
    })
  }));
};

export var Social = function Social() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Main, {
    background: "light-2",
    elevation: "large",
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/React.createElement(Box, {
    flex: true
  })), /*#__PURE__*/React.createElement(Footer, {
    background: "light-4",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(GrommetIcon, {
    color: "brand",
    size: "medium"
  }), /*#__PURE__*/React.createElement(Text, {
    alignSelf: "center",
    color: "brand",
    size: "small"
  }, "Grommet")), /*#__PURE__*/React.createElement(Media, null), /*#__PURE__*/React.createElement(Text, {
    textAlign: "center",
    size: "xsmall"
  }, "\xA9Copyright")));
};