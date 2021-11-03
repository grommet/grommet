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

export const CustomTheme = () => {
  const [value, setValue] = useState(options[2]);
  return (
    <Grommet
      theme={{
        select: {
          clear: {
            container: { background: 'light-1', pad: 'medium' },
            hover: { background: 'neutral-1', color: 'light-1' },
            text: { color: 'brand' },
          },
        },
      }}
    >
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
CustomTheme.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Clear',
};
