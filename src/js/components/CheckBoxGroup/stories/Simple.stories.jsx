import React from 'react';

import { Box, CheckBoxGroup } from 'grommet';

export const Simple = () => (
  <Box pad="medium">
    <CheckBoxGroup options={['First', 'Second', 'Third']} />
  </Box>
);

export default {
  title: 'Input/CheckBoxGroup/Simple',
};
