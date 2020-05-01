import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var Medium = function Medium() {
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

var Small = function Small() {
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

var Large = function Large() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    size: "large"
  }, "Heading 1 - Large"), /*#__PURE__*/React.createElement(Text, {
    size: "xxlarge"
  }, "Text XXLarge"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "xlarge"
  }, "Paragraph - XLarge", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "large"
  }, "Heading 2 - Large"), /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }, "Text XLarge"), /*#__PURE__*/React.createElement(Paragraph, {
    size: "large"
  }, "Paragraph - Large", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "large"
  }, "Heading 3 - Large"), /*#__PURE__*/React.createElement(Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "large"
  }, "Heading 4 - Large"), /*#__PURE__*/React.createElement(Text, null, "Text Medium"), /*#__PURE__*/React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller))));
};

storiesOf('Typography', module).add('Small', function () {
  return /*#__PURE__*/React.createElement(Small, null);
}).add('Medium', function () {
  return /*#__PURE__*/React.createElement(Medium, null);
}).add('Large', function () {
  return /*#__PURE__*/React.createElement(Large, null);
});