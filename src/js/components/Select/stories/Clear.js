import React, { useState } from 'react';
import { Box, Select } from 'grommet';

const options = ['one', 'two', 'three'];

export const Top = () => {
  const [value, setValue] = useState(options[0]);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear
      />
    </Box>
    // </Grommet>
  );
};
Top.parameters = {
  chromatic: { disable: true },
};

export const Bottom = () => {
  const [value, setValue] = useState(options[1]);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear Options"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear={{ position: 'bottom' }}
      />
    </Box>
    // </Grommet>
  );
};
Bottom.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
