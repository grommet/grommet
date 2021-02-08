import React from 'react';
import { Box, Grommet, RoutedButton as GrommetRoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var RoutedButton = function RoutedButton() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), /*#__PURE__*/React.createElement(GrommetRoutedButton, {
    label: "Go",
    path: "/"
  })));
};
RoutedButton.storyName = 'Routed button';
export default {
  title: "Controls/Button/Routed button"
};