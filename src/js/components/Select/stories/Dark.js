import React, { useState } from 'react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

export const Dark = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill background="dark-1" align="center" justify="center">
        <Select
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    </Grommet>
  );
};
