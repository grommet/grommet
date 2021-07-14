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

let HeaderDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  HeaderDoc = require('./doc').doc(Header);
}
const HeaderWrapper = HeaderDoc || Header;

export { HeaderWrapper as Header };
