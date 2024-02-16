import React from 'react';

import { Box, Grommet, Pagination, Text } from 'grommet';

const customTheme = {
  pagination: {
    container: {
      background: 'pink',
      border: {
        color: 'green',
        size: 'large',
      },
    },

    controls: {
      gap: 'xxsmall',
    },
  },
};

export const CustomTest = () => (
  <Grommet theme={customTheme}>
    <Box gap="large">
      <Box
        align="start"
        pad={{ top: 'medium', bottom: 'medium', horizontal: 'medium' }}
      >
        <Text margin={{ bottom: 'small' }}>
          Custom Theme via theme.pagination.container
        </Text>
        <Pagination numberItems={237} />
      </Box>
      <Box
        align="start"
        pad={{ top: 'medium', bottom: 'medium', horizontal: 'medium' }}
        fill="horizontal"
      >
        <Pagination numberItems={237} summary stepSelector />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Pagination/Custom Themed/CustomTest',
};
