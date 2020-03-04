import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Form, TextInput, Text } from 'mnet-ui-base';

const StyledPlaceholder = () => {
  return (
    <Box>
      <Form>
        <TextInput name="name" placeholder={<Text>footer</Text>} />
      </Form>
    </Box>
  );
};

storiesOf('TextInput', module).add('StyledPlaceholder', () => (
  <StyledPlaceholder />
));
