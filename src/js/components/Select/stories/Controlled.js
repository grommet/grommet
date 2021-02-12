import React, { useState } from 'react';

import { Box, Button, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

export const Controlled = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Grommet full theme={grommet}>
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
    </Grommet>
  );
};

export default {
  title: 'Input/Select/Controlled',
};
