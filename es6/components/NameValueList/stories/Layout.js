import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data, metricData } from './data';
export var Layout = function Layout() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "2xl"
    }, "layout = grid / pairProps direction = column"), /*#__PURE__*/React.createElement(NameValueList, {
      layout: "grid",
      pairProps: {
        direction: 'column'
      }
    }, Object.entries(data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/React.createElement(NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/React.createElement(Text, null, value));
    })), /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "2xl"
    }, "layout = grid / pairProps direction = column-reverse"), /*#__PURE__*/React.createElement(NameValueList, {
      valueProps: {
        width: 'small'
      },
      pairProps: {
        direction: 'column-reverse'
      },
      layout: "grid"
    }, Object.entries(metricData).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/React.createElement(NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/React.createElement(Text, null, value));
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/NameValueList/Layout'
};