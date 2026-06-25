import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, Text, TimeInput } from 'grommet';

export const MinuteStep5 = () => {
  const [value5, setValue5] = React.useState('');

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium" gap="xsmall">
        <Text size="small" weight="bold">
          minuteStep = 5
        </Text>
        <TimeInput
          timeFormat="24hr"
          minuteStep={5}
          value={value5}
          onChange={({ value: nextValue }: { value: string }) =>
            setValue5(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

MinuteStep5.storyName = 'Minute Step';

MinuteStep5.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-minute-step-5',
} satisfies Meta;
