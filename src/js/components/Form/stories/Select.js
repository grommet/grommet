import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Form, FormField, Select, Grommet } from 'grommet';

const options = [
  { label: 'option 1', value: 1 },
  { label: 'option 2', value: 2 },
  { label: 'option 3', value: 3 },
];

const FormFieldSelect = () => {
  const [value, setValue] = useState({});
  const onChange = useCallback(nextValue => setValue(nextValue), []);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Form value={value} onChange={onChange}>
          <FormField label="Label" name="select">
            <Select
              name="select"
              placeholder="placeholder"
              options={options}
              labelKey="label"
              valueKey="value"
            />
          </FormField>
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('Form', module).add('Select', () => <FormFieldSelect />);
