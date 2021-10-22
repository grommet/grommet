import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data, metricData } from './data';
export var Layout = function Layout() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "large"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
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
  }))), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
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
  })))));
};
export default {
  title: 'Visualizations/NameValueList/Layout'
};