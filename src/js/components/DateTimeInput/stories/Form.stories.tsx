import React from 'react';

import { Box, Button, Form, FormField } from 'grommet';
import { DateTimeInput } from '../index';

export const FormIntegration = () => {
  const [value, setValue] = React.useState({ appointment: '' });

  return (
    <Box pad="medium" width="medium" gap="small">
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
};

FormIntegration.storyName = 'Form';

export default {
  title: 'Input/DateTimeInput/Form',
};
