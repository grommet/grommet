import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const State = () => {
  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput value="08:30 AM" disabled />
      </Box>
    </Box>
  );
};

State.storyName = 'Disabled';

State.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-state',
} satisfies Meta;
