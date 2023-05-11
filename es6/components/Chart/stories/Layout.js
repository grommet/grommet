import React from 'react';
import { Box, Chart, Heading } from 'grommet';
var type = 'bar';
var value = 10;
var values = Array(14).fill(0).map(function (_, index) {
  var delta = index * 3;
  value += delta % 2 ? delta : -delta;
  return [index, value];
});
export var Layout = function Layout() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      margin: "medium"
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2
    }, "full"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      border: true,
      alignSelf: "stretch"
    }, /*#__PURE__*/React.createElement(Chart, {
      type: type,
      values: values,
      size: {
        width: 'full'
      },
      round: true
    })), /*#__PURE__*/React.createElement(Heading, {
      level: 2
    }, "auto, gap"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      border: true,
      alignSelf: "start"
    }, /*#__PURE__*/React.createElement(Chart, {
      type: type,
      values: values,
      size: {
        width: 'auto'
      },
      gap: "small",
      round: true
    })), /*#__PURE__*/React.createElement(Heading, {
      level: 2
    }, "default"), /*#__PURE__*/React.createElement(Box, {
      pad: "medium",
      borde: true,
      alignSelf: "start"
    }, /*#__PURE__*/React.createElement(Chart, {
      type: type,
      values: values,
      round: true
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/Chart/Layout'
};