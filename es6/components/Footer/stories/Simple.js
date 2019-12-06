import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Main, {
    background: "light-2",
    elevation: "large",
    pad: "large",
    gap: "large"
  }, React.createElement(Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), React.createElement(Box, {
    flex: true
  })), React.createElement(Footer, {
    background: "light-4",
    justify: "center",
    pad: "small"
  }, React.createElement(Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright Grommet")));
};

storiesOf('Footer', module).add('Simple', function () {
  return React.createElement(Simple, null);
});