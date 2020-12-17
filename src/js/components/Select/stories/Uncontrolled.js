import React from 'react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

export const Uncontrolled = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          options={['one', 'two']}
          onChange={({ option }) => console.log(option)}
        />
      </Box>
    </Grommet>
  );
};

Uncontrolled.parameters = {
  chromatic: { disable: true },
};
