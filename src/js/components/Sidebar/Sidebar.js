import React from 'react';
import { Box } from '../Box';
import { SidebarPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

export const Sidebar = ({ children, footer, header, ...rest }) => {
  const { theme } = useThemeValue();
  return (
    <Box
      height={{ min: '100%' }}
      gap={theme.sideBar.gap}
      pad={theme.sideBar.pad}
      {...rest}
    >
      {header}
      <Box flex>{children}</Box>
      {footer}
    </Box>
  );
};

Sidebar.propTypes = SidebarPropTypes;
