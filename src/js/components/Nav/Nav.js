import React from 'react';

import { Box } from '../Box';

const Nav = ({ ...rest }) => (
  <Box as="nav" flex={false} gap="medium" {...rest} />
);

export { Nav };
