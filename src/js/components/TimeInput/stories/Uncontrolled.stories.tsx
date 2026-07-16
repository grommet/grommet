import React from 'react';

import { Box, Text, TimeInput } from 'grommet';

export const Uncontrolled = () => (
  <Box pad="large" width="medium" gap="small">
    <Text size="small">
      Uncontrolled input (manages its own internal state).
    </Text>
    <TimeInput format="12" defaultValue="12:34:56 PM" />
  </Box>
);

export default {
  title: 'Input/TimeInput/Uncontrolled',
};
