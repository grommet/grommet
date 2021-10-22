import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';
export var CustomName = function CustomName() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    weight: "bold",
    size: "3xl"
  }, "Custom Name"), /*#__PURE__*/React.createElement(NameValueList, null, Object.entries(data).map(function (_ref) {
    var name = _ref[0],
        value = _ref[1];
    return /*#__PURE__*/React.createElement(NameValuePair, {
      name: /*#__PURE__*/React.createElement(Text, {
        size: "small",
        weight: "bold"
      }, name),
      key: name
    }, value);
  })))));
};
export default {
  title: 'Visualizations/NameValueList/Custom Name'
};