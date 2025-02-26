import React from 'react';
import { Box, Paragraph } from 'grommet';
var text = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
export var Maxlines = function Maxlines() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    border: true,
    width: "small",
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/React.createElement(Paragraph, {
    maxLines: 3
  }, text)), /*#__PURE__*/React.createElement(Paragraph, {
    maxLines: 3
  }, text));
};
export default {
  title: 'Type/Paragraph/Maxlines'
};