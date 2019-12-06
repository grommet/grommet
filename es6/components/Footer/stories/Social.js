import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { FacebookOption } from "grommet-icons/es6/icons/FacebookOption";
import { Instagram } from "grommet-icons/es6/icons/Instagram";
import { Twitter } from "grommet-icons/es6/icons/Twitter";
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

var Media = function Media() {
  return React.createElement(Box, {
    direction: "row",
    gap: "xxsmall",
    justify: "center"
  }, React.createElement(Anchor, {
    a11yTitle: "Share feedback on Github",
    href: "https://www.instagram.com/",
    icon: React.createElement(Instagram, {
      color: "brand"
    })
  }), React.createElement(Anchor, {
    a11yTitle: "Chat with us on Slack",
    href: "https://www.facebook.com/",
    icon: React.createElement(FacebookOption, {
      color: "brand"
    })
  }), React.createElement(Anchor, {
    a11yTitle: "Follow us on Twitter",
    href: "https://twitter.com/",
    icon: React.createElement(Twitter, {
      color: "brand"
    })
  }));
};

var Social = function Social() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Main, {
    background: "light-2",
    elevation: "large",
    pad: "medium",
    gap: "large"
  }, React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), React.createElement(Box, {
    flex: true
  })), React.createElement(Footer, {
    background: "light-4",
    pad: "small"
  }, React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, React.createElement(GrommetIcon, {
    color: "brand",
    size: "medium"
  }), React.createElement(Text, {
    alignSelf: "center",
    color: "brand",
    size: "small"
  }, "Grommet")), React.createElement(Media, null), React.createElement(Text, {
    textAlign: "center",
    size: "xsmall"
  }, "\xA9Copyright")));
};

storiesOf('Footer', module).add('Social', function () {
  return React.createElement(Social, null);
});