import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';
export var Width = function Width() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "3xl"
    }, "Name width xsmall"), /*#__PURE__*/React.createElement(NameValueList, {
      nameProps: {
        width: 'xsmall'
      }
    }, Object.entries(data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/React.createElement(NameValuePair, {
        name: name,
        key: name
      }, /*#__PURE__*/React.createElement(Text, null, value));
    })), /*#__PURE__*/React.createElement(Text, {
      weight: "bold",
      size: "3xl"
    }, "Value width large"), /*#__PURE__*/React.createElement(NameValueList, {
      valueProps: {
        width: 'large'
      }
    }, Object.entries(data).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      return /*#__PURE__*/React.createElement(NameValuePair, {
        name: name,
        key: name
      }, /*#__PURE__*/React.createElement(Text, null, value));
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/NameValueList/Width'
};