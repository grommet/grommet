import React, { useState } from 'react';

import { Box, Grommet, Select, grommet } from 'grommet';

const options = ['one', 'two', 'three'];

export const Top = () => {
  const [value, setValue] = useState(options[0]);
  return (
    <Grommet theme={grommet}>
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
    </Grommet>
  );
};
Top.parameters = {
  chromatic: { disable: true },
};

export const Bottom = () => {
  const [value, setValue] = useState(options[1]);
  return (
    <Grommet theme={grommet}>
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
    </Grommet>
  );
};
Bottom.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
