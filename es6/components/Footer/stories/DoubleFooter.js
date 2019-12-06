function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Grommet as GrommetIcon } from "grommet-icons/es6/icons/Grommet";
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';
import { fiveColumns as data } from './data';
var StyledAnchor = styled(Anchor).withConfig({
  displayName: "DoubleFooter__StyledAnchor",
  componentId: "hzr4m1-0"
})(["font-weight:200;"]);

var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, _ref);

  return React.createElement(StyledAnchor, _extends({
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
    }, item[0]), React.createElement(Box, null, [1, 2, 3, 4].map(function (i) {
      return React.createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

var DoubleFooter = function DoubleFooter() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    border: true
  }, React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), React.createElement(Box, {
    flex: true
  })), React.createElement(Footer, {
    background: "dark-1",
    pad: "large"
  }, React.createElement(FooterContent, null)), React.createElement(Footer, {
    background: "dark-2",
    pad: {
      horizontal: 'large',
      vertical: 'small'
    }
  }, React.createElement(Box, {
    direction: "row",
    gap: "small"
  }, React.createElement(GrommetIcon, {
    color: "brand"
  }), React.createElement(Text, {
    alignSelf: "center"
  }, "grommet.io")), React.createElement(Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright")));
};

storiesOf('Footer', module).add('DoubleFooter', function () {
  return React.createElement(DoubleFooter, null);
});