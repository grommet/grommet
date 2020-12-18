import React from 'react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';
export var FixedSizesBox = function FixedSizesBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "small",
    height: "small",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: {
      horizontal: 'hidden',
      vertical: 'scroll'
    }
  }, Array(20).fill().map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Text, {
        key: i
      }, "Small (" + i + ")")
    );
  })), /*#__PURE__*/React.createElement(Box, {
    width: "medium",
    height: "medium",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Medium"), /*#__PURE__*/React.createElement(Box, {
    width: "large",
    height: "large",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Large")));
};
FixedSizesBox.story = {
  name: 'Fixed sizes'
};