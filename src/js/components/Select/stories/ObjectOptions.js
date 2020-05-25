import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Select } from 'mnet-ui-base';

const objectOptions = [
  {
    label: 'Male',
    value: 1,
  },
  {
    label: 'Female',
    value: 2,
  },
  {
    label: 'Non Binary',
    value: 3,
  },
  {
    label: 'Other',
    value: 4,
  },
];

const Example = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          labelKey="label"
          valueKey={{ key: 'value', reduce: true }}
          value={value}
          options={objectOptions}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </Box>
    </>
  );
};

storiesOf('Select', module).add('Object options', () => <Example />);
