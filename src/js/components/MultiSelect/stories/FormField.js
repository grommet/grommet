import React, { useCallback, useState } from 'react';

import { Box, Button, Form, FormField } from 'grommet';
import { MultiSelect } from '../MultiSelect';

const options = [
  'Apple',
  'Orange',
  'Banana',
  'Grape',
  'Melon',
  'Strawberry',
  'Kiwi',
  'Mango',
  'Raspberry',
  'Rhubarb',
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
          <MultiSelect
            showSelectedInline
            name="select"
            placeholder="placeholder"
            options={options}
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
  title: 'Input/MultiSelect/Inside a FormField',
};
