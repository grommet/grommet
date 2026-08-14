// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, CheckBoxGroup } from 'grommet';

export const Simple = () => (
  <Box pad="medium">
    <CheckBoxGroup options={['First', 'Second', 'Third']} />
  </Box>
);

export default {
  title: 'Input/CheckBoxGroup/Simple',
};
