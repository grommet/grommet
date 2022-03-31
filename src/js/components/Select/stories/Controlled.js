import React, { useState } from 'react';

import { Box, Button, Select } from 'grommet';

export const Controlled = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large" gap="small">
      <Button onClick={() => setOpen(!open)} label="Control the select" />
      <Select
        id="select"
        name="select"
        placeholder="Select"
        open={open}
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
      />
    </Box>
    // </Grommet>
  );
};

Controlled.args = {
  full: true,
};

export default {
  title: 'Input/Select/Controlled',
};
