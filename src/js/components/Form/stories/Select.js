import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Form, FormField, Select } from 'mnet-ui-base';

const options = [
  { label: 'option 1', value: 1 },
  { label: 'option 2', value: 2 },
  { label: 'option 3', value: 3 },
];

const FormFieldSelect = () => {
  const [value, setValue] = useState({});
  const onChange = useCallback(nextValue => setValue(nextValue), []);

  return (
    <>
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
    </>
  );
};

storiesOf('Form', module).add('Select', () => <FormFieldSelect />);
