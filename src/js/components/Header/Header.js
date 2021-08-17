import React from 'react';

import { Box } from '../Box';

const Header = React.forwardRef(({ ...rest }, ref) => (
  <Box
    align="center"
    as="header"
    direction="row"
    flex={false}
    justify="between"
    gap="medium"
    {...rest}
    ref={ref}
  />
));
Header.displayName = 'Header';

export { Header };
