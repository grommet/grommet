import React from 'react';
import { Box, Grommet, NameValueList, NameValuePair, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';
export var PairProps = function PairProps() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "large"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    weight: "bold",
    size: "2xl"
  }, "layout = column (default) / pairProps direction = column"), /*#__PURE__*/React.createElement(NameValueList, {
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
  })))));
};
export default {
  title: 'Visualizations/NameValueList/Pair Props'
};