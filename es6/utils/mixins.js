import { css } from 'styled-components';
export var parseMetricToNum = function parseMetricToNum(metric) {
  if (typeof metric === 'number') return metric;
  if (metric.match(/\s/) && process.env.NODE_ENV !== 'production') {
    console.warn("Invalid single measurement value: \"" + metric + "\"");
  }
  return parseFloat(metric.match(/\d+(\.\d+)?/), 10);
};
export var edgeToNum = function edgeToNum(size, theme) {
  return size ? parseMetricToNum(theme.global.edgeSize[size] || size) : 0;
};
export var fontSize = function fontSize(size, lineHeight) {
  return css(["font-size:", ";line-height:", ";"], function (props) {
    return parseMetricToNum(size) / parseMetricToNum(props.theme.global.font.size) * 1 + "rem";
  }, function (props) {
    return lineHeight || Math.ceil(parseMetricToNum(size) / parseMetricToNum(props.theme.global.lineHeight)) * (parseMetricToNum(props.theme.global.lineHeight) / parseMetricToNum(size)) + "px";
  });
};
export var breakpointStyle = function breakpointStyle(breakpoint, content, responsive) {
  var st = responsive === 'container' ? css(["@container ", "{", ";}"], breakpoint.value && "(max-width: " + breakpoint.value + "px)", content) : css(["@media only screen ", "{", ";}"], breakpoint.value && "and (max-width: " + breakpoint.value + "px)", content);
  return st;
};
var _findAllByType = function findAllByType(component, type) {
  var matches = [];
  if (component.type === type) {
    matches.push(component);
  }
  if (component.children) {
    component.children.forEach(function (child) {
      matches = matches.concat(_findAllByType(child, type));
    });
  }
  return matches;
};
export { _findAllByType as findAllByType };
export var getAvailableAtBadge = function getAvailableAtBadge(availableAt, componentType) {
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