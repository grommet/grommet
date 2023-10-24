import React from 'react';
import { Box } from 'grommet';
export var RTLBox = function RTLBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: "small",
      gap: "small",
      border: true
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: "small",
      border: "start"
    }, "border start"), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      pad: {
        start: 'large'
      },
      background: "brand"
    }, "pad start"), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      margin: {
        start: 'large'
      },
      background: "brand"
    }, "margin start"))
    // </Grommet>
  );
};

RTLBox.storyName = 'RTL';
RTLBox.args = {
  dir: 'rtl'
};
export default {
  title: 'Layout/Box/RTL'
};