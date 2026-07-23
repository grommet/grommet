import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button, Form, FormField } from 'grommet';
import { DateTimeInput } from '../DateTimeInput';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Input/DateTimeInput/Form',
  component: DateTimeInput,
};

export default meta;

type Story = StoryObj<typeof DateTimeInput>;

export const FormIntegration: Story = {
  render: () => {
    const [value, setValue] = React.useState({ appointment: '' });

    return (
      <Box pad="large" width="medium" gap="small">
        <Form
          value={value}
          onChange={(nextValue: { appointment: string }) => {
            setValue(nextValue);
          }}
          onSubmit={() => {
            setValue({ appointment: '' });
          }}
        >
          <FormField
            htmlFor="appointment-date-time"
            label="Choose an appointment date and time"
            name="appointment"
            required
          >
            <DateTimeInput
              id="appointment-date-time"
              name="appointment"
              format="12"
            />
          </FormField>
          <Button type="submit" label="submit" />
        </Form>
      </Box>
    );
  },
};
