import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from './data';
export var PairProps = function PairProps() {
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
    })))
    // </Grommet>
  );
};

export default {
  title: 'Visualizations/NameValueList/Pair Props'
};