import React from 'react';

import { Box, Button, Form, FormField, TimeInput } from 'grommet';

export const TimeForm = () => {
  const [value, setValue] = React.useState({ value: '' });
  const onChange = (nextValue: { value: string }) => {
    setValue(nextValue);
  };

  return (
    <Box align="center" pad="large">
      <Form
        value={value}
        onChange={onChange}
        onSubmit={() => {
          setValue({ value: '' });
        }}
      >
        <FormField
          htmlFor="appointment-time"
          name="value"
          label="Choose an appointment time"
          required
        >
          <TimeInput id="appointment-time" name="value" format="24" />
        </FormField>
        <Button type="submit" label="submit" />
      </Form>
    </Box>
  );
};

TimeForm.storyName = 'Form';

export default {
  title: 'Input/TimeInput',
};
