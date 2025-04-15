import React from 'react';

import { Box } from '../Box';

const Nav = ({ ...rest }) => (
  // TO DO theme object
  <Box as="nav" flex={false} gap="medium" {...rest} />
);

export { Nav };
