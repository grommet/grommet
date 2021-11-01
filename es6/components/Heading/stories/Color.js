import React from 'react';
import { Heading } from 'grommet';
export var Color = function Color() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Heading, {
      color: "accent-1"
    }, "Colored Heading") // </Grommet>

  );
};
export default {
  title: 'Type/Heading/Color'
};