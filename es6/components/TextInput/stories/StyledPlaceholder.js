import React from 'react';
import { Box, Form, TextInput, Text } from 'grommet';
export var StyledPlaceholder = function StyledPlaceholder() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(TextInput, {
      name: "name",
      placeholder: /*#__PURE__*/React.createElement(Text, null, "placeholder"),
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

StyledPlaceholder.storyName = 'Styled placeholder';
export default {
  title: 'Input/TextInput/Styled placeholder'
};