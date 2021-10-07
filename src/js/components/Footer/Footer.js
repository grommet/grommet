import React from 'react';

import { Box } from '../Box';

const Footer = ({ ...rest }) => (
  <Box
    as="footer"
    align="center"
    direction="row"
    flex={false}
    gap="medium"
    justify="between"
    {...rest}
  />
);

export { Footer };
