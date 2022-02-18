import React, { useCallback, useState } from 'react';

import { Box, Button, Form, FormField, Select } from 'grommet';

const options = [
  { label: 'option 1', value: 1 },
  { label: 'option 2', value: 2 },
  { label: 'option 3', value: 3 },
];

export const InsideFormField = () => {
  const [value, setValue] = useState({});
  const onChange = useCallback((nextValue) => setValue(nextValue), []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Form
        value={value}
        onChange={onChange}
        onSubmit={() => console.log('Submit', value)}
      >
        <FormField label="Label" name="select">
          <Select
            name="select"
            placeholder="placeholder"
            options={options}
            labelKey="label"
            valueKey="value"
          />
        </FormField>
        <Button type="submit" label="Update" primary />
      </Form>
    </Box>
    // </Grommet>
  );
};

InsideFormField.storyName = 'Inside a FormField';

export default {
  title: 'Input/Select/Inside a FormField',
};
