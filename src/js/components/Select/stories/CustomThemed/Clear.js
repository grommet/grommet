import React, { useState } from 'react';

import { Box, Grommet, Select } from 'grommet';

const options = ['one', 'two', 'three'];

export const Clear = () => {
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
Clear.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Select/Custom Themed/Clear',
};
