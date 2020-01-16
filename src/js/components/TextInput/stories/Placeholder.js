import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Form, TextInput, Text } from 'grommet';

const Placeholder = () => {
  return (
    <Box>
      <Form>
        <TextInput name="name" placeholder={<Text>footer</Text>} />
        <TextInput name="name" placeholder="foobar" />
      </Form>
    </Box>
  );
};

storiesOf('TextInput', module).add('Placeholder', () => <Placeholder />);
