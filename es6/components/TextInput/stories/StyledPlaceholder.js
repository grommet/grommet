import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Form, TextInput, Text } from 'grommet';

var StyledPlaceholder = function StyledPlaceholder() {
  return /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(TextInput, {
    name: "name",
    placeholder: /*#__PURE__*/React.createElement(Text, null, "footer")
  })));
};

storiesOf('TextInput', module).add('StyledPlaceholder', function () {
  return /*#__PURE__*/React.createElement(StyledPlaceholder, null);
});