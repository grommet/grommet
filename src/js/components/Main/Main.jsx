import React from 'react';

import { Box } from '../Box';

const Main = ({ ...rest }) => (
  <Box as="main" fill="vertical" flex="grow" overflow="auto" {...rest} />
);

export { Main };
