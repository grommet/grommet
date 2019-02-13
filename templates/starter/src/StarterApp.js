import React from 'react';
import { Box, Grommet, Heading, Paragraph } from 'grommet';

export const StarterApp = () => (
  <Grommet>
    <Box pad="small">
      <Heading level={3}>
        <strong>Hello World</strong>
      </Heading>
      <Paragraph>Hello from a Grommet page!</Paragraph>
    </Box>
  </Grommet>
);
