// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box } from 'grommet';
import { DateTimeInput } from '../index';

export const Simple = () => {
  const [value, setValue] = React.useState('2026-07-22T18:30:00.000Z');
  const onChange = ({ value: next }: { value?: string }) => {
    setValue(next || '');
  };

  return (
    <Box pad="large" width="medium" gap="small">
      <DateTimeInput format="12" value={value} onChange={onChange} />
    </Box>
  );
};

export default {
  title: 'Input/DateTimeInput/Simple',
};
