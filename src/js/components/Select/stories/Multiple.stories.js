import React, { useState } from 'react';

import { Box, Select } from 'grommet';

const options = ['one', 'two'];

export const Multiple = () => {
  const [value, setValue] = useState(['one']);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Select"
        multiple
        closeOnChange={false}
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      />
    </Box>
    // </Grommet>
  );
};

Multiple.parameters = {
  chromatic: { disable: true },
};

Multiple.args = {
  full: true,
};

export default {
  title: 'Input/Select/Multiple',
};
