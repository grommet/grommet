import React from 'react';
import { Box, Text } from 'grommet';
export var FixedSizesBox = function FixedSizesBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
      },
      tabIndex: 0
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
    }, "Large"))
    // </Grommet>
  );
};

FixedSizesBox.storyName = 'Fixed sizes';
export default {
  title: "Layout/Box/Fixed sizes"
};