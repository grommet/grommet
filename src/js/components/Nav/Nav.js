import React from 'react';

import { Box } from '../Box';

const Nav = ({ ...rest }) => (
  <Box as="nav" flex={false} gap="medium" {...rest} />
);

let NavDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  NavDoc = require('./doc').doc(Nav);
}
const NavWrapper = NavDoc || Nav;

export { NavWrapper as Nav };
