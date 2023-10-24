import React from 'react';
import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
export var Small = function Small() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    size: "small"
  }, "Heading 1 - Small"), /*#__PURE__*/React.createElement(Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "small"
  }, "Heading 2 - Small"), /*#__PURE__*/React.createElement(Text, null, "Text Medium"), /*#__PURE__*/React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "small"
  }, "Heading 3 - Small"), /*#__PURE__*/React.createElement(Text, null, "Text Medium"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "small"
  }, "Heading 4 - Small"), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, "Text Small"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller))));
};
export default {
  title: 'Type/Typography/Small'
};