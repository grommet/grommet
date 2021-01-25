import React from 'react';

import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box pad="medium">
      <CheckBoxGroup options={['First', 'Second', 'Third']} />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/CheckBoxGroup/Simple',
};
