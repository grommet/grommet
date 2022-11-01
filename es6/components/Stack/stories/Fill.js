import React from 'react';
import { Box, Stack } from 'grommet';
export var Fill = function Fill() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Stack, {
      fill: true
    }, /*#__PURE__*/React.createElement(Box, {
      background: "brand",
      fill: true
    }, "Test"))
    // </Grommet>
  );
};

Fill.args = {
  full: true
};
export default {
  title: 'Layout/Stack/Fill'
};