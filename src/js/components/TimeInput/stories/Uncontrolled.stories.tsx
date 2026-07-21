import React from 'react';

import { Box, Text, TimeInput } from 'grommet';

export const Uncontrolled = () => {
  const onChange = ({ value }: { value?: string }) => {
    console.log('onChange iso time:', value);
  };

  return (
    <Box pad="large" width="medium" gap="small">
      <Text size="small">
        Uncontrolled input (manages its own internal state).
      </Text>
      <TimeInput format="12" defaultValue="12:34:56" onChange={onChange} />
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/Uncontrolled',
};
