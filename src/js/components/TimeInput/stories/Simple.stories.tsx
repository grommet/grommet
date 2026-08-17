// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, TimeInput } from 'grommet';

export const Simple = () => {
  const onChange = ({ value }: { value?: string }) => {
    console.log('onChange iso time:', value);
  };

  return (
    <Box pad="large" width="medium">
      <TimeInput format="12" onChange={onChange} />
    </Box>
  );
};

export default {
  title: 'Input/TimeInput/Simple',
};
