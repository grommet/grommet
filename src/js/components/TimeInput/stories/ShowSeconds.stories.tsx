import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const ShowSeconds = () => {
  const [value12, setValue12] = React.useState('03:15:30 pm');

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput
          timeFormat="12hr"
          showSeconds
          value={value12}
          onChange={({ value: nextValue }: { value: string }) =>
            setValue12(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

ShowSeconds.storyName = 'With Seconds';

ShowSeconds.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-show-seconds-12-hour',
} satisfies Meta;
