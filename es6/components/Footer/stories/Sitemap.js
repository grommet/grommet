function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';
import { threeColumns as data } from './data';

var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, _ref);

  return React.createElement(Anchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};

var FooterContent = function FooterContent() {
  return data.map(function (item) {
    return React.createElement(Box, {
      gap: "medium",
      key: item[0]
    }, React.createElement(Text, {
      weight: "bold",
      size: "small"
    }, item[0]), React.createElement(Box, null, [1, 2, 3].map(function (i) {
      return React.createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

var Sitemap = function Sitemap() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    gap: "large",
    border: true
  }, React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), React.createElement(Box, {
    flex: true
  })), React.createElement(Footer, {
    background: "dark-1",
    pad: "large"
  }, React.createElement(Box, {
    direction: "row-responsive",
    gap: "xsmall"
  }, React.createElement(Box, {
    align: "center",
    gap: "small"
  }, React.createElement(GrommetIcon, {
    color: "brand",
    size: "large"
  }), React.createElement(Text, {
    alignSelf: "center",
    color: "brand",
    weight: "bold"
  }, "grommet.io"))), React.createElement(FooterContent, null)));
};

storiesOf('Footer', module).add('Sitemap', function () {
  return React.createElement(Sitemap, null);
});