import React from 'react';

import { Link } from '../Link';
import { Box } from '../Box';

export const SkipLink = ({ id, label, ...rest }) => (
  <Box margin="small">
    <Link href={`#${id}`} label={label} {...rest} />
  </Box>
);
