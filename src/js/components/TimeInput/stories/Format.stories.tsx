import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const Format = () => {
  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput timeFormat="12hr" />
      </Box>
    </Box>
  );
};

Format.storyName = 'Time format';

Format.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-format-12-hour',
} satisfies Meta;
