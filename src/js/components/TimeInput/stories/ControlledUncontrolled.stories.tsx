import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, Text, TimeInput } from 'grommet';

/**
 * Controlled pattern: parent manages the value via `value` + `onChange`.
 *
 * See: https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components
 */
export const Controlled = () => {
  const [controlled, setControlled] = React.useState('03:30 PM');

  return (
    <Box align="center" justify="center" pad="large" gap="small">
      <Text size="small" color="text-weak">
        Parent manages state via <code>value</code> + <code>onChange</code>.
        Current value: <strong>{controlled || '—'}</strong>
      </Text>
      <Box width="medium">
        <TimeInput
          timeFormat="12hr"
          value={controlled}
          onChange={({ value: nextValue }: { value: string }) =>
            setControlled(nextValue)
          }
        />
      </Box>
    </Box>
  );
};

Controlled.storyName = 'Controlled';

Controlled.parameters = {
  chromatic: { disable: true },
};

export const Uncontrolled = () => {
  return (
    <Box align="center" justify="center" pad="large" gap="small">
      <Text size="small" color="text-weak">
        Seeded with <code>defaultValue</code>. The component owns its own
        internal state after mount.
      </Text>
      <Box width="medium">
        <TimeInput timeFormat="12hr" defaultValue="09:00 AM" />
      </Box>
    </Box>
  );
};

Uncontrolled.storyName = 'Uncontrolled';

Uncontrolled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-controlled-uncontrolled',
} satisfies Meta;
