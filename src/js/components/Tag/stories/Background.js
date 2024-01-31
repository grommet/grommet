import React from 'react';

import { Box, Tag } from 'grommet';

export const Background = () => (
  <Box pad="large" gap="medium" align="start">
    <Tag name="name" value="value" background="brand" />
    <Tag value="value" background="graph-0" />
    <Tag
      name="name that is much longer and may need to wrap"
      value="value"
      background="dark-1"
    />
  </Box>
);

export default {
  title: 'Type/Tag/Background',
};
