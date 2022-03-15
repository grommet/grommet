import React from 'react';
import { Box, Stack } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Stack, {
      anchor: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      background: "light-3"
    }), /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      background: "brand"
    })) // </Grommet>

  );
};
export default {
  title: 'Layout/Stack/Simple'
};