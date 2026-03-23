import React, { forwardRef } from 'react';
import { Box } from '../Box';

const XGuide = forwardRef(({ guide, pad: padArg, thickness }, ref) => {
  let pad = padArg;
  if (thickness) {
    // omit any horizontal pad so the guides cover the thickness that
    // is within the pad
    if (typeof padArg === 'object')
      pad = { ...padArg, top: 'none', bottom: 'none' };
    else if (typeof padArg === 'string') pad = { horizontal: padArg };
  }
  return (
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
  );
});

export { XGuide };
