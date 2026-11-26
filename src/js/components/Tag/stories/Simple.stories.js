// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Tag } from 'grommet';

export const Simple = () => (
  <Box pad="large" gap="medium" align="start">
    <Tag name="name" value="value" />
    <Tag value="value" />
    <Tag name="name that is much longer and may need to wrap" value="value" />
  </Box>
);

export default {
  title: 'Type/Tag/Simple',
};
