import React from 'react';
import { Box } from '../Box';
import { SidebarPropType } from './propTypes';

export const Sidebar = ({ children, footer, header, ...rest }) => (
  <Box pad="small" gap="large" height={{ min: '100%' }} {...rest}>
    {header}
    <Box flex>{children}</Box>
    {footer}
  </Box>
);

Sidebar.propTypes = SidebarPropType;

Sidebar.defaultProps = {
  children: undefined,
  footer: undefined,
  header: undefined,
};
