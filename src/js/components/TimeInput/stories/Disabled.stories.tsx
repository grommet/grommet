// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, TimeInput } from 'grommet';

export const Disabled = () => (
  <Box pad="large" width="medium" gap="small">
    <TimeInput format="12" defaultValue="09:45:10" disabled />
  </Box>
);

export default {
  title: 'Input/TimeInput/Disabled',
};
