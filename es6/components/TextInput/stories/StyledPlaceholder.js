import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Form, TextInput, Text } from 'grommet';

var StyledPlaceholder = function StyledPlaceholder() {
  return React.createElement(Box, null, React.createElement(Form, null, React.createElement(TextInput, {
    name: "name",
    placeholder: React.createElement(Text, null, "footer")
  })));
};

storiesOf('TextInput', module).add('StyledPlaceholder', function () {
  return React.createElement(StyledPlaceholder, null);
});