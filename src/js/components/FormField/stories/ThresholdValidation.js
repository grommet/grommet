import React from 'react';

import { Box, Form, FormField, TextInput } from 'grommet';

export const ThresholdValidation = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large">
    <Form validate="change">
      <FormField
        label="Label"
        validate={{ max: 10, threshold: 0.25 }}
        name="issue-description"
        htmlFor="issue-description"
      >
        <TextInput
          id="issue-description"
          name="issue-description"
          placeholder="placeholder"
        />
      </FormField>

      <FormField
        label="Label with default threshold"
        validate={{ max: 10 }}
        name="issue-description-with-default-threshold"
        htmlFor="issue-description-with-default-threshold"
      >
        <TextInput
          id="issue-description-with-default-threshold"
          name="issue-description-with-default-threshold"
          placeholder="placeholder"
        />
      </FormField>
    </Form>
  </Box>
);

ThresholdValidation.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/FormField/ThresholdValidation',
};
