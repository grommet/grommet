import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Header, Main, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Header, {
    background: "light-4",
    pad: "small"
  }, React.createElement(Text, {
    size: "small"
  }, "Header")), React.createElement(Main, {
    pad: "small"
  }, "I am Main! Main is a good place to place your content."));
};

storiesOf('Main', module).add('Simple', function () {
  return React.createElement(Simple, null);
});