import React from 'react';
import { Box } from '../Box';
import { SidebarPropTypes } from './propTypes';

export const Sidebar = ({ children, footer, header, ...rest }) => (
  // TO DO theme object
  <Box pad="small" gap="large" height={{ min: '100%' }} {...rest}>
    {header}
    <Box flex>{children}</Box>
    {footer}
  </Box>
);

Sidebar.propTypes = SidebarPropTypes;
