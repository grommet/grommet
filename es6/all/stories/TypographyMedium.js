import React from 'react';
import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
export var Medium = function Medium() {
  var margin = undefined;
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    margin: margin
  }, "Heading 1 - Medium"), /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }, "Text XLarge"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "large",
    margin: margin
  }, "Paragraph - Large", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    margin: margin
  }, "Heading 2 - Medium"), /*#__PURE__*/React.createElement(Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/React.createElement(Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: margin
  }, "Heading 3 - Medium"), /*#__PURE__*/React.createElement(Text, null, "Text Medium"), /*#__PURE__*/React.createElement(Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    margin: margin
  }, "Heading 4 - Medium"), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Text Small"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "small",
    margin: margin
  }, "Paragraph - Small", paragraphFiller))));
};
export default {
  title: 'Type/Typography/Medium'
};