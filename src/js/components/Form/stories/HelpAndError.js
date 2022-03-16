import React from 'react';

import { Box, Form, FormField, Text, TextInput } from 'grommet';
import { Alert } from 'grommet-icons';

export const HelpAndError = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Form>
      <FormField
        label="Label"
        htmlFor="text-input"
        help="Text to help the user know what is possible"
        error="Text to call attention to an issue with this field"
      >
        <TextInput
          id="text-input"
          placeholder="placeholder"
          value="Value"
          onChange={() => {}}
        />
      </FormField>
    </Form>
    <Form>
      <FormField
        label="Label"
        htmlFor="text-input"
        help={
          <Text weight="bold" size="small">
            Enter HPE email
          </Text>
        }
        error={
          <Box
            align="center"
            gap="small"
            direction="row"
            background="background-front"
          >
            <Alert />
            <Text align="center" size="small">
              Custom Text to call attention to an issue with this field
            </Text>
          </Box>
        }
      >
        <TextInput id="email" value="jane@hpe" onChange={() => {}} />
      </FormField>
    </Form>
  </Box>
  // </Grommet>
);

HelpAndError.storyName = 'Help and error';

export default {
  title: 'Input/Form/Help and error',
};
