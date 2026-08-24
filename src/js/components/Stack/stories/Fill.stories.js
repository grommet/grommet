// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Stack } from 'grommet';

export const Fill = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Stack fill>
    <Box background="brand" fill>
      Test
    </Box>
  </Stack>
  // </Grommet>
);

Fill.args = {
  full: true,
};

export default {
  title: 'Layout/Stack/Fill',
};
