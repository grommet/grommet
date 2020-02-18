import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Grommet, Box, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

var Background = function Background() {
  var themeColor = 'background-back';
  var hexValue = '#DCD0FF';
  var cssColor = 'gold';
  return React.createElement(Box, {
    gap: "medium"
  }, React.createElement(Grommet, null, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with no theme or background prop"))), React.createElement(Grommet, {
    theme: hpe,
    themeMode: "dark"
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with theme & themeMode but no background prop"))), React.createElement(Grommet, {
    theme: hpe,
    themeMode: "light",
    background: themeColor
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with background as theme color of '", themeColor, "'"))), React.createElement(Grommet, {
    theme: grommet,
    background: hexValue
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with background as HEX value of '", hexValue, "'"))), React.createElement(Grommet, {
    theme: grommet,
    background: cssColor
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with background as CSS color name of '", cssColor, "'"))), React.createElement(Grommet, {
    theme: grommet,
    background: {
      color: 'pink',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Text, null, "Grommet with background as object containing color and image"))));
};

storiesOf('Grommet', module).add('Background', function () {
  return React.createElement(Background, null);
});