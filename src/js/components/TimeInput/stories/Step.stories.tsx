import React from 'react';

import { Box, Text, TimeInput } from 'grommet';

export const Step = () => (
  <Box pad="large" width="medium" gap="small">
    <Text size="small">Minute options increment by 15 (00, 15, 30, 45).</Text>
    <TimeInput format="24" defaultValue="10:30:00" minuteStep={15} />
  </Box>
);

export default {
  title: 'Input/TimeInput/Step',
};
