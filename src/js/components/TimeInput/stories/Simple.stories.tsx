import React from 'react';

import { Box, Button, Text, TimeInput } from 'grommet';

export const Controlled = () => {
  const [value, setValue] = React.useState('12:34:56 PM');

  return (
    <Box pad="large" width="medium" gap="small">
      <Text size="small">
        Controlled input (value is driven by React state).
      </Text>
      <TimeInput
        format="12"
        value={value}
        onChange={({ value: next }) => setValue(next || '')}
      />
      <Box direction="row" gap="small">
        <Button
          label="Set 01:02:03 PM"
          onClick={() => setValue('01:02:03 PM')}
        />
        <Button label="Clear" onClick={() => setValue('')} />
      </Box>
    </Box>
  );
};

export const Disabled = () => (
  <Box pad="large" width="medium" gap="small">
    <TimeInput format="12" defaultValue="09:45:10 AM" disabled />
  </Box>
);

export const MinuteStep_15 = () => (
  <Box pad="large" width="medium" gap="small">
    <Text size="small">Minute options increment by 15 (00, 15, 30, 45).</Text>
    <TimeInput format="24" defaultValue="10:30:00" minuteStep={15} />
  </Box>
);

export const ReadOnly = () => (
  <Box pad="large" width="medium" gap="small">
    <TimeInput format="12" defaultValue="09:45:10 AM" readOnly />
  </Box>
);

export const Simple = () => (
  <Box pad="large" width="medium">
    <TimeInput format="12" />
  </Box>
);

export const Uncontrolled = () => (
  <Box pad="large" width="medium" gap="small">
    <Text size="small">
      Uncontrolled input (manages its own internal state).
    </Text>
    <TimeInput format="12" defaultValue="12:34:56 PM" />
  </Box>
);

export default {
  title: 'Input/TimeInput',
};
