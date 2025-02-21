import React, { useState } from 'react';

import { Box, Select } from 'grommet';

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

export const ObjectOptions = () => {
  const [value, setValue] = useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
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
    // </Grommet>
  );
};

ObjectOptions.storyName = 'Object options';

ObjectOptions.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Object options',
};
