import React, { forwardRef } from 'react';
import { Box } from '../Box';

const YGuide = forwardRef(({ guide, pad: padArg }, ref) => {
  // omit any horizontal pad so the guides cover the thickness that
  // is within the pad
  let pad;
  if (typeof padArg === 'object')
    pad = { ...padArg, start: 'none', end: 'none' };
  else if (typeof padArg === 'string') pad = { vertical: padArg };
  return (
    <Box ref={ref} fill justify="between" pad={pad} responsive={false}>
      {Array.from({ length: guide.y.count }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={i} border="top" />
      ))}
    </Box>
  );
});

export { YGuide };
