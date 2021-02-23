import React from 'react';
import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
var gradientRainbow = // eslint-disable-next-line max-len
'radial-gradient(circle at 50% -3.03%, #ff99ff 0, #ff91ff 3.33%, #ff8bf9 6.67%, #ff86e4 10%, #ff85cf 13.33%, #ff85b9 16.67%, #ff89a4 20%, #ff8f90 23.33%, #ff967d 26.67%, #ff9e6a 30%, #ffa758 33.33%, #ffb047 36.67%, #ffb937 40%, #ffc228 43.33%, #ffca1a 46.67%, #f8d110 50%, #e5d812 53.33%, #d0de1f 56.67%, #bae32f 60%, #a2e840 63.33%, #87ec52 66.67%, #67ef65 70%, #36f279 73.33%, #00f48e 76.67%, #00f6a3 80%, #00f7b9 83.33%, #00f8cf 86.67%, #00f9e5 90%, #00f9fb 93.33%, #00f9ff 96.67%, #00f8ff 100%);';
export var Color = function Color() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    pad: "small"
  }, [1, 2, 3].map(function (color) {
    return /*#__PURE__*/React.createElement(Box, {
      align: "center",
      direction: "row",
      gap: "small",
      key: "graph-" + color
    }, /*#__PURE__*/React.createElement(Spinner, {
      color: "graph-" + color
    }), /*#__PURE__*/React.createElement(Text, null, "Loading..."));
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: false,
    background: gradientRainbow
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: false // eslint-disable-next-line max-len
    ,
    background: "radial-gradient(circle at 45.6% 25.03%, #8d8cff 0, #ad83ff 3.33%, #c67aff 6.67%, #dc71f2 10%, #ed67e3 13.33%, #fb5fd2 16.67%, #ff57c0 20%, #ff52ad 23.33%, #ff4f9b 26.67%, #ff5089 30%, #ff5476 33.33%, #ff5a65 36.67%, #ff6154 40%, #ff6a43 43.33%, #fe7232 46.67%, #f37b1f 50%, #e78303 53.33%, #da8b00 56.67%, #cb9200 60%, #bc9900 63.33%, #ab9f00 66.67%, #99a400 70%, #86a900 73.33%, #72ad02 76.67%, #5ab021 80%, #39b336 83.33%, #00b549 86.67%, #00b75c 90%, #00b96f 93.33%, #00ba82 96.67%, #00bb95 100%);"
  }), /*#__PURE__*/React.createElement(Text, null, "Loading..."))));
};
export default {
  title: 'Visualizations/Spinner/Color'
};