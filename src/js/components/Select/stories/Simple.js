import React, { useState } from 'react';

import { Box, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large" gap="medium">
        <Text weight="bold">Enabled</Text>
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
        <Text weight="bold">Disabled</Text>
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          disabled
        />
      </Box>
    </Grommet>
  );
};
