import React from 'react';
import { grommet, Grommet, Box, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
export var Background = function Background() {
  var themeColor = 'background-back';
  var hexValue = '#DCD0FF';
  var cssColor = 'gold';
  return /*#__PURE__*/React.createElement(Box, {
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with no theme or background prop"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: hpe,
    themeMode: "dark"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with theme & themeMode but no background prop"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: hpe,
    themeMode: "light",
    background: themeColor
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with background as theme color of '", themeColor, "'"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    background: hexValue
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with background as HEX value of '", hexValue, "'"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    background: cssColor
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with background as CSS color name of '", cssColor, "'"))), /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    background: {
      color: 'pink',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, null, "Grommet with background as object containing color and image"))));
};
export default {
  title: 'Utilities/Grommet/Background'
};