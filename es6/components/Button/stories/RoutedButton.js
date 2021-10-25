import React from 'react';
import { Box, RoutedButton as GrommetRoutedButton, Text } from 'grommet';
export var RoutedButton = function RoutedButton() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, {
    margin: "medium",
    size: "small"
  }, "Note: RoutedButton will soon be deprecated"), /*#__PURE__*/React.createElement(GrommetRoutedButton, {
    label: "Go",
    path: "/"
  }));
};
RoutedButton.storyName = 'Routed button';
export default {
  title: "Controls/Button/Routed button"
};