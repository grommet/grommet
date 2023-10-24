"use strict";

exports.__esModule = true;
exports.parseMetricToNum = exports.getAvailableAtBadge = exports.fontSize = exports.findAllByType = exports.edgeToNum = exports.breakpointStyle = void 0;
var _styledComponents = require("styled-components");
var parseMetricToNum = exports.parseMetricToNum = function parseMetricToNum(metric) {
  if (typeof metric === 'number') return metric;
  if (metric.match(/\s/) && process.env.NODE_ENV !== 'production') {
    console.warn("Invalid single measurement value: \"" + metric + "\"");
  }
  return parseFloat(metric.match(/\d+(\.\d+)?/), 10);
};
var edgeToNum = exports.edgeToNum = function edgeToNum(size, theme) {
  return size ? parseMetricToNum(theme.global.edgeSize[size] || size) : 0;
};
var fontSize = exports.fontSize = function fontSize(size, lineHeight) {
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], function (props) {
    return parseMetricToNum(size) / parseMetricToNum(props.theme.global.font.size) * 1 + "rem";
  }, function (props) {
    return lineHeight || Math.ceil(parseMetricToNum(size) / parseMetricToNum(props.theme.global.lineHeight)) * (parseMetricToNum(props.theme.global.lineHeight) / parseMetricToNum(size)) + "px";
  });
};
var breakpointStyle = exports.breakpointStyle = function breakpointStyle(breakpoint, content) {
  return (0, _styledComponents.css)(["@media only screen ", "{", ";}"], breakpoint.value && "and (max-width: " + breakpoint.value + "px)", content);
};
var findAllByType = exports.findAllByType = function findAllByType(component, type) {
  var matches = [];
  if (component.type === type) {
    matches.push(component);
  }
  if (component.children) {
    component.children.forEach(function (child) {
      matches = matches.concat(findAllByType(child, type));
    });
  }
  return matches;
};
var getAvailableAtBadge = exports.getAvailableAtBadge = function getAvailableAtBadge(availableAt, componentType) {
  return [{
    url: "https://storybook.grommet.io/?selectedKind=" + componentType + "-" + availableAt + "&full=0&stories=1&panelRight=0",
    badge: 'https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png',
    label: 'Storybook'
  }, {
    url: "https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/" + availableAt.toLowerCase() + "&module=%2Fsrc%2F" + availableAt + ".js",
    badge: 'https://codesandbox.io/static/img/play-codesandbox.svg',
    label: 'CodeSandbox'
  }];
};