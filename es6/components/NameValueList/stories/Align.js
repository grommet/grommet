import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';
export var Align = function Align() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    weight: "bold",
    size: "3xl"
  }, "Align value end"), /*#__PURE__*/React.createElement(NameValueList, {
    valueProps: {
      align: 'end'
    }
  }, Object.entries(data).map(function (_ref) {
    var name = _ref[0],
        value = _ref[1];
    return /*#__PURE__*/React.createElement(NameValuePair, {
      key: name,
      name: name
    }, value);
  }))), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    weight: "bold",
    size: "3xl"
  }, "Align name end"), /*#__PURE__*/React.createElement(NameValueList, {
    nameProps: {
      align: 'end'
    }
  }, Object.entries(data).map(function (_ref2) {
    var name = _ref2[0],
        value = _ref2[1];
    return /*#__PURE__*/React.createElement(NameValuePair, {
      key: name,
      name: name
    }, value);
  })))));
};
export default {
  title: 'Visualizations/NameValueList/Align'
};