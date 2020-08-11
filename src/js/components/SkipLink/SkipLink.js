import React, { forwardRef } from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';

export const SkipLink = forwardRef(({ id, label, ...rest }, ref) => (
  <Box margin="small">
    <Anchor href={`#${id}`} ref={ref} label={label} {...rest} />
  </Box>
));
