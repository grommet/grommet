import React from 'react';

import { Box, Button, DateInput, Form, FormField } from 'grommet';

export const DateForm = () => {
  const [value, setValue] = React.useState({ value: '' });
  const onChange = (nextValue) => {
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue.value));
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Form
        value={value}
        onChange={onChange}
        onSubmit={({ value: nextValue }) => {
          console.log(nextValue);
          setValue({ value: '' });
        }}
      >
        <FormField name="value" label="value" required>
          <DateInput name="value" format="mm/dd/yyyy" />
        </FormField>
        <Button type="submit" label="submit" />
      </Form>
    </Box>
  );
};

DateForm.storyName = 'Form';

export default {
  title: 'Input/DateInput/Form',
};
