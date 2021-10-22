import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(NameValueList, null, Object.entries(data).map(function (_ref) {
    var name = _ref[0],
        value = _ref[1];
    return /*#__PURE__*/React.createElement(NameValuePair, {
      key: name,
      name: name
    }, value);
  }))));
};
export default {
  title: 'Visualizations/NameValueList/Simple'
};