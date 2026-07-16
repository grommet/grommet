import React from 'react';

import { Box, TimeInput } from 'grommet';

export const Simple = () => (
  <Box pad="large" width="medium">
    <TimeInput format="12" />
  </Box>
);

export default {
  title: 'Input/TimeInput/Simple',
};
