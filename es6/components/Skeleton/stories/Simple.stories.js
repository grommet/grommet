import React from 'react';
import { Box, Heading, Paragraph, Skeleton, Text } from 'grommet';
var HeadingExample = function HeadingExample() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Heading"), /*#__PURE__*/React.createElement(Box, {
    skeleton: true
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, "Heading")));
};
var TextExample = function TextExample() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Text"), /*#__PURE__*/React.createElement(Box, {
    skeleton: true
  }, /*#__PURE__*/React.createElement(Text, null, "Text")));
};
var ParagraphExample = function ParagraphExample() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."), /*#__PURE__*/React.createElement(Box, {
    skeleton: true,
    fill: "horizontal"
  }, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")));
};
var SkeletonExample = function SkeletonExample() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Skeleton"), /*#__PURE__*/React.createElement(Skeleton, null), /*#__PURE__*/React.createElement(Skeleton, {
    height: "small"
  }));
};
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(HeadingExample, null), /*#__PURE__*/React.createElement(TextExample, null), /*#__PURE__*/React.createElement(ParagraphExample, null), /*#__PURE__*/React.createElement(SkeletonExample, null));
};
export default {
  title: 'Visualizations/Skeleton/Simple'
};