import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var RouteButton = function RouteButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), React.createElement(RoutedButton, {
    label: "Go",
    path: "/"
  })));
};

storiesOf('Button', module).add('RoutedButton', function () {
  return React.createElement(RouteButton, null);
});