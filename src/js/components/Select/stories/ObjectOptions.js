import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Grommet, Select } from 'grommet';

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
    <Grommet theme={grommet}>
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
    </Grommet>
  );
};

storiesOf('Select', module).add('Object options', () => <Example />);
