import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { data } from './data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "small"
    }, /*#__PURE__*/React.createElement(NameValueList, null, Object.entries(data).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      return /*#__PURE__*/React.createElement(NameValuePair, {
        key: name,
        name: name
      }, value);
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/NameValueList/Simple'
};