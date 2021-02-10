import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const NumberMiddlePages = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Box>
        <Text>numberMiddlePages = 4 (number of pages in the middle)</Text>
        <Pagination numberItems={237} page={10} numberMiddlePages={4} />
      </Box>
      <Box>
        <Text>numberMiddlePages = 5 (number of pages in the middle)</Text>
        <Pagination numberItems={237} page={10} numberMiddlePages={5} />
      </Box>
    </Box>
  </Grommet>
);

NumberMiddlePages.storyName = 'Number middle pages';

export default {
  title: 'Controls/Pagination/Number middle pages',
};
