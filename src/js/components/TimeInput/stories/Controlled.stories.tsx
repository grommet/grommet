// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Button, CheckBox, Text, TimeInput } from 'grommet';

export const Controlled = () => {
  const [value, setValue] = React.useState('12:34:56');
  const [showSeconds, setShowSeconds] = React.useState(false);

  const onChange = ({ value: next }: { value?: string }) => {
    console.log('onChange iso time:', next);
    setValue(next || '');
  };

  return (
    <Box pad="large" width="medium" gap="small">
      <Text size="small">
        Controlled input (value is driven by React state).
      </Text>
      <TimeInput
        format="12"
        showSeconds={showSeconds}
        value={value}
        onChange={onChange}
      />
      <CheckBox
        label="Show seconds"
        checked={showSeconds}
        onChange={(event) => setShowSeconds(event.target.checked)}
      />
      <Box direction="row" gap="small">
        <Button label="Set 01:02 PM" onClick={() => setValue('13:02:03')} />
        <Button label="Clear" onClick={() => setValue('')} />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/Controlled',
};
