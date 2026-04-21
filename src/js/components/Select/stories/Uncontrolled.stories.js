import React from 'react';

import { Box, Select } from 'grommet';

export const Uncontrolled = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large">
    <Select
      id="select"
      name="select"
      placeholder="Select"
      options={['one', 'two']}
      onChange={({ option }) => console.log(option)}
    />
  </Box>
  // </Grommet>
);

Uncontrolled.parameters = {
  chromatic: { disable: true },
};

Uncontrolled.args = {
  full: true,
};

export default {
  title: 'Input/Select/Uncontrolled',
};
