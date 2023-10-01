import React, { useState } from 'react';

import { Box, Grommet, Select, Text } from 'grommet';

export const Disabled = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box fill align="center" justify="start" pad="large" gap="medium">
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

Disabled.args = {
  full: true,
};

export default {
  title: 'Input/Select/Disabled',
};
