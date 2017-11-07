import React from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';

const SkipLink = ({ id, label, ...rest }) => (
  <Box margin='small'>
    <Anchor
      href={`#${id}`}
      label={label}
      {...rest}
    />
  </Box>
);

export default SkipLink;
