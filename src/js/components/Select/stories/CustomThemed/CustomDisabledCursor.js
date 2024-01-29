import React, { useState } from 'react';

import { Box, Grommet, Select, Text } from 'grommet';

export const CustomDisabledCursor = () => {
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

CustomDisabledCursor.args = {
  full: true,
};

export default {
  title: 'Input/Select/Custom Themed/Custom Disabled Cursor',
};
