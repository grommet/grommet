import React, { useState } from 'react';

import { Box, Select } from 'grommet';

export const Simple = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="medium">
      <Select
        id="select"
        name="select"
        placeholder="Select"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
      />
    </Box>
    // </Grommet>
  );
};

Simple.args = {
  full: true,
};

export default {
  title: 'Input/Select/Simple',
};
