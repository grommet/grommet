import React from 'react';
import { Box, TextInput, Form, FormField } from 'grommet';

export const ReadOnly = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium" gap="medium">
      <Form>
        <FormField>
          <TextInput
            readOnlyCopy
            value="Read only with copy button"
            aria-label="read only"
          />
        </FormField>
        <FormField>
          <TextInput readOnly value="Read only" aria-label="read only" />
        </FormField>
      </Form>
      <TextInput
        readOnlyCopy
        value="Read only with copy button"
        aria-label="read only"
      />
      <TextInput readOnly value="Read only" aria-label="read only" />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Input/TextInput/ReadOnly',
};
