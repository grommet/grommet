import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';
export var CustomName = function CustomName() {
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
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/NameValueList/Custom Name'
};