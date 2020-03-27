import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Select } from 'grommet';

const objectOptions = [
  {
    lab: 'Male',
    value: 1,
  },
  {
    label: 'Female',
    value: 2,
  },
  {
    lab: 'Non Binary',
    value: 3,
  },
  {
    lab: 'Other',
    value: 4,
  },
];

const OptionsFromObject = () => {
  const [value, setValue] = useState('');

  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        id="select"
        name="select"
        placeholder="Select"
        labelKey="label"
        value={value}
        options={objectOptions}
        onChange={({ option }) => setValue(option)}
      />
    </Box>
  );
};

storiesOf('Select', module).add('Options from object', () => (
  <OptionsFromObject />
));
