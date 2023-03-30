import React from 'react';

import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

// This example shows a way to perform validation across multiple fields.
export const AggregateValidation = () => {
  const [value, setValue] = React.useState({ name: 'a', email: 'b' });
  const message =
    value.name && value.email && value.name[0] !== value.email[0]
      ? 'Mismatched first character'
      : undefined;
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onSubmit={({ value: nextValue }) => console.log(nextValue)}
        >
          <FormField label="Name" name="name" required>
            <TextInput aria-label="name" name="name" type="name" />
          </FormField>

          <FormField label="Email" name="email" required>
            <TextInput aria-label="email" name="email" type="email" />
          </FormField>

          {message && (
            <Box pad={{ horizontal: 'small' }}>
              <Text color="status-error">{message}</Text>
            </Box>
          )}

          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button
              onClick={() => setValue({ name: '', email: '' })}
              type="reset"
              label="Reset"
            />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
    // </Grommet>
  );
};

AggregateValidation.storyName = 'Aggregate validation';

AggregateValidation.args = {
  full: true,
};

export default {
  title: 'Input/Form/Aggregate validation',
};
