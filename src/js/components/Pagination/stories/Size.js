import React from 'react';

import { Box, Pagination, Text } from 'grommet';

export const Size = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="start" pad="small" gap="medium">
    <Text>Small</Text>
    <Pagination numberItems={237} size="small" />
    <Text>Medium (Default)</Text>
    <Pagination numberItems={237} size="medium" />
    <Text>Large</Text>
    <Pagination numberItems={237} size="large" />
  </Box>
  // </Grommet>
);

export default {
  title: 'Controls/Pagination/Size',
};
