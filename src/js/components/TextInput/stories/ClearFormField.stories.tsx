// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

const meta: Meta<typeof TextInput> = {
  title: 'Input/TextInput/Clear in FormField',
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const ClearFormFieldExample = () => {
  const [submitted, setSubmitted] = React.useState<string>();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Form
        validate="blur"
        onSubmit={({ value }) => setSubmitted(JSON.stringify(value))}
        onReset={() => setSubmitted(undefined)}
      >
        <FormField htmlFor="clear-name" name="name" label="Name" required>
          <TextInput id="clear-name" name="name" clear />
        </FormField>
        <Box direction="row" gap="small">
          <Button type="submit" label="Submit" primary />
          <Button type="reset" label="Reset" />
        </Box>
        {submitted && <Text margin={{ top: 'small' }}>{submitted}</Text>}
      </Form>
    </Box>
    // </Grommet>
  );
};

export const ClearInFormField: Story = {
  name: 'Clear in FormField',
  render: () => <ClearFormFieldExample />,
};
