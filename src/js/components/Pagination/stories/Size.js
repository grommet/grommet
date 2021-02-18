import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Size = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="small" gap="large">
      <>
        <Text>Small</Text>
        <Pagination numberItems={237} size="small" />
      </>
      <>
        <Text>Medium (Default)</Text>
        <Pagination numberItems={237} size="medium" />
      </>
      <>
        <Text>Large</Text>
        <Pagination numberItems={237} size="large" />
      </>
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Pagination/Size',
};
