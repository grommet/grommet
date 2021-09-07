import React, { useState } from 'react';

import { Box, Grommet, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
  const options = ['one', 'really long option aaaaaaaaaaaaaaaaaaaaa'];
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large" gap="medium">
        <Text>Original Select built with TextInput:</Text>
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          size="medium"
        />
        <Text>Accessible Select built with Text:</Text>
        <Select
          accessible
          id="select"
          name="select"
          placeholder="Select"
          value={value1}
          options={options}
          onChange={({ option }) => setValue1(option)}
          size="medium"
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/Select/Simple',
};
