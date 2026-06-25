import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const PresetTime = () => {
  const [value, setValue] = React.useState('00:00');

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput
          timeFormat="24hr"
          value={value}
          onChange={({ value: nextValue }: { value: string }) =>
            setValue(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

PresetTime.storyName = 'Preset Time';

PresetTime.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-preset-time',
} satisfies Meta;
