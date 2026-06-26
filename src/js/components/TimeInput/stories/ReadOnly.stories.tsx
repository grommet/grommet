import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const ReadOnly = () => (
  <Box align="center" justify="center" pad="large">
    <Box width="medium">
      <TimeInput value="09:30 am" readOnly />
    </Box>
  </Box>
);

ReadOnly.storyName = 'Read-Only';

ReadOnly.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-read-only',
} satisfies Meta;
