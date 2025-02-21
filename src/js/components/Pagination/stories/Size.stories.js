import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Size = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="medium">
    <Text>Small</Text>
    <Pagination
      aria-label="Pagination with small size"
      numberItems={237}
      size="small"
    />
    <Text>Medium (Default)</Text>
    <Pagination
      aria-label="Pagination with medium size"
      numberItems={237}
      size="medium"
    />
    <Text>Large</Text>
    <Pagination
      aria-label="Pagination with large size"
      numberItems={237}
      size="large"
    />
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Size',
};
