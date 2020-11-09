import React from 'react';
import { Box, Form, Grommet, TextInput, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var StyledPlaceholder = function StyledPlaceholder() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(TextInput, {
    name: "name",
    placeholder: /*#__PURE__*/React.createElement(Text, null, "placeholder")
  }))));
};
StyledPlaceholder.story = {
  name: 'Styled placeholder'
};