import React from 'react';
import { Anchor, Box, Grommet, Paragraph, Text } from 'grommet';
var customTheme = {
  global: {
    colors: {
      // Overriding existing colors
      brand: '#4D4CDB',
      'accent-1': '#6FFFB0',
      'accent-2': '#7FFFB0',
      'accent-3': '#8FFFB0',
      'accent-4': '#9FFFB0',
      'neutral-1': '#10873D',
      'neutral-2': '#20873D',
      'neutral-3': '#30873D',
      'neutral-4': '#40873D',
      focus: '#000',
      // Setting new colors
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#F740FF',
      red: '#FC6161',
      orange: '#FFBC44',
      yellow: '#FFEB59',
      // you can also point to existing grommet colors
      brightGreen: 'accent-1',
      deepGreen: 'neutral-2',
      // Changing default text color,
      // all colors could be either a string or a dark and light object
      text: {
        dark: 'teal',
        light: 'purple'
      }
    }
  }
};
export var Colors = function Colors() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    background: "yellow",
    gap: "medium",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Custom color purple"), /*#__PURE__*/React.createElement(Text, {
    color: "deepGreen"
  }, "Inline custom color of deepGreen"), /*#__PURE__*/React.createElement(Paragraph, {
    color: "red"
  }, "Wrapping your application with the Grommet component that is pointing to your customTheme object as shown on the example, will allow you full access to your custom colors across your application. You can override any Grommet color that is mentioned in the docs in a similar fashion."), /*#__PURE__*/React.createElement(Anchor, {
    href: "https://github.com/grommet/grommet/wiki/Color-Properties"
  }, "Click here to read more about Grommet Colors")));
};
export default {
  title: 'Utilities/Theme/Colors'
};