import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var RouteButton = function RouteButton() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), /*#__PURE__*/React.createElement(RoutedButton, {
    label: "Go",
    path: "/"
  })));
};

storiesOf('Button', module).add('RoutedButton', function () {
  return /*#__PURE__*/React.createElement(RouteButton, null);
});