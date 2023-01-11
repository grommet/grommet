import React from 'react';

import { Box, Form, FormField, TextInput } from 'grommet';

export const ThresholdValidation = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Form validate="change">
      <FormField
        label="Label"
        validate={{ length: { max: 10, threshold: 0.5 } }}
        name="issue-description"
        htmlFor="issue-description"
      >
        <TextInput
          id="issue-description"
          name="issue-description"
          placeholder="placeholder"
        />
      </FormField>
    </Form>
  </Box>
);
// </Grommet>

export default {
  title: 'Input/FormField/ThresholdValidation',
};
