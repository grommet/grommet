import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { mnet, Box, FormField, Select, MnetUIBase } from 'mnet-ui-base';
import { allOptions } from './data';

const FormFieldSelect = props => {
  const [value, setValue] = useState('');

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <FormField label="Label" htmlFor="select" {...props}>
          <Select
            id="select"
            placeholder="placeholder"
            options={allOptions}
            value={value}
            onChange={({ option }) => setValue(option)}
          />
        </FormField>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Form', module).add('Select', () => <FormFieldSelect />);
