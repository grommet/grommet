import React, { forwardRef } from 'react';
import { Box } from '../Box';

const YGuide = forwardRef(({ guide, pad }, ref) => (
  <Box ref={ref} fill justify="between" pad={pad} responsive={false}>
    {Array.from({ length: guide.y.count }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box key={i} border="top" />
    ))}
  </Box>
));

export { YGuide };
