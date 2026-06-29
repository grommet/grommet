import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, Text, TimeInput } from 'grommet';

export const MinuteStep15 = () => {
  const [value15, setValue15] = React.useState('');

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium" gap="xsmall">
        <Text size="small" weight="bold">
          minuteStep = 15
        </Text>
        <TimeInput
          timeFormat="24hr"
          minuteStep={15}
          value={value15}
          onChange={({ value: nextValue }: { value: string }) =>
            setValue15(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

MinuteStep15.storyName = 'Minute Step';

MinuteStep15.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-minute-step-15',
} satisfies Meta;
