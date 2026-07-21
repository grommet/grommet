import React from 'react';

import { Box, TimeInput } from 'grommet';

export const ReadOnly = () => (
  <Box pad="large" width="medium" gap="small">
    <TimeInput format="12" defaultValue="09:45:10" readOnly />
  </Box>
);

export default {
  title: 'Input/TimeInput/ReadOnly',
};
