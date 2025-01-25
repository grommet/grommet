import React from 'react';

import { Box, Form, FormField, Text, TextInput } from 'grommet';

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
        label="Email"
        htmlFor="email"
        help={
          <Text weight="lighter" size="small">
            Text to help the user know what is possible
          </Text>
        }
        error={
          <Box align="center" background="background-front">
            <Text weight="bolder" align="center" size="small">
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
