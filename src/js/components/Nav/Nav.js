import React from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';


 // TODO resolve whether children should be allowed with items
const Nav = ({ children, items = [], ...rest }) => (
  <Box as="nav" flex={false} gap="medium" {...rest}>
    {items.map(item => (
      <Anchor href={item.href} label={item.label} />
    ))}
    {children}
  </Box>
);

let NavDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  NavDoc = require('./doc').doc(Nav);
}
const NavWrapper = NavDoc || Nav;

export { NavWrapper as Nav };
