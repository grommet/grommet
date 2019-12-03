import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var Medium = function Medium() {
  var margin = undefined;
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement("div", null, React.createElement(Heading, {
    margin: margin
  }, "Heading 1 - Medium"), React.createElement(Text, {
    size: "xlarge"
  }, "Text XLarge"), React.createElement(Paragraph, {
    size: "large",
    margin: margin
  }, "Paragraph - Large", paragraphFiller), React.createElement(Heading, {
    level: 2,
    margin: margin
  }, "Heading 2 - Medium"), React.createElement(Text, {
    size: "large"
  }, "Text Large"), React.createElement(Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), React.createElement(Heading, {
    level: 3,
    margin: margin
  }, "Heading 3 - Medium"), React.createElement(Text, null, "Text Medium"), React.createElement(Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), React.createElement(Heading, {
    level: 4,
    margin: margin
  }, "Heading 4 - Medium"), React.createElement(Text, {
    size: "small"
  }, "Text Small"), React.createElement(Paragraph, {
    size: "small",
    margin: margin
  }, "Paragraph - Small", paragraphFiller))));
};

var Small = function Small() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement("div", null, React.createElement(Heading, {
    size: "small"
  }, "Heading 1 - Small"), React.createElement(Text, {
    size: "large"
  }, "Text Large"), React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), React.createElement(Heading, {
    level: 2,
    size: "small"
  }, "Heading 2 - Small"), React.createElement(Text, null, "Text Medium"), React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), React.createElement(Heading, {
    level: 3,
    size: "small"
  }, "Heading 3 - Small"), React.createElement(Text, null, "Text Medium"), React.createElement(Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller), React.createElement(Heading, {
    level: 4,
    size: "small"
  }, "Heading 4 - Small"), React.createElement(Text, {
    size: "small"
  }, "Text Small"), React.createElement(Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller))));
};

var Large = function Large() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement("div", null, React.createElement(Heading, {
    size: "large"
  }, "Heading 1 - Large"), React.createElement(Text, {
    size: "xxlarge"
  }, "Text XXLarge"), React.createElement(Paragraph, {
    size: "xlarge"
  }, "Paragraph - XLarge", paragraphFiller), React.createElement(Heading, {
    level: 2,
    size: "large"
  }, "Heading 2 - Large"), React.createElement(Text, {
    size: "xlarge"
  }, "Text XLarge"), React.createElement(Paragraph, {
    size: "large"
  }, "Paragraph - Large", paragraphFiller), React.createElement(Heading, {
    level: 3,
    size: "large"
  }, "Heading 3 - Large"), React.createElement(Text, {
    size: "large"
  }, "Text Large"), React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller), React.createElement(Heading, {
    level: 4,
    size: "large"
  }, "Heading 4 - Large"), React.createElement(Text, null, "Text Medium"), React.createElement(Paragraph, null, "Paragraph - Medium", paragraphFiller))));
};

storiesOf('Typography', module).add('Small', function () {
  return React.createElement(Small, null);
}).add('Medium', function () {
  return React.createElement(Medium, null);
}).add('Large', function () {
  return React.createElement(Large, null);
});