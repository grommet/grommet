import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const PresetTime = () => {
  const [value, setValue] = React.useState('09:30 AM');

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput
          timeFormat="12hr"
          value={value}
          onChange={({ value: nextValue }: { value: string }) =>
            setValue(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

PresetTime.storyName = 'Preset Value';

PresetTime.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-preset-time',
} satisfies Meta;
