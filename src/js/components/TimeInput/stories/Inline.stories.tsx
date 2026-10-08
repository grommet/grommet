// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box } from '../../Box';
import { TimeInput } from '..';

export const Inline = () => {
  const [value, setValue] = React.useState('13:30');

  return (
    <Box align="center" pad="large">
      <TimeInput
        id="inline-time"
        inline
        format="24"
        value={value}
        onChange={({ value: next }: { value?: string }) => {
          setValue(next || '');
        }}
      />
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/Inline',
};
