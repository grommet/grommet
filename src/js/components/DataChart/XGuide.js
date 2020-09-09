import React, { forwardRef } from 'react';
import { Box } from '../Box';

const XGuide = forwardRef(({ guide, pad }, ref) => (
  <Box
    ref={ref}
    fill
    direction="row"
    justify="between"
    pad={pad}
    responsive={false}
  >
    {Array.from({ length: guide.x.count }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box key={i} border="left" />
    ))}
  </Box>
));

export { XGuide };
