import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ToolbarPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';
import { useThemeValue } from '../../utils/useThemeValue';

export const Toolbar = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const { theme } = useThemeValue();

  const defaultLayoutProps = {
    direction: 'row',
    align: 'start',
    gap: theme.toolbar?.gap,
  };

  const smallLayoutProps = {
    direction: 'row',
    wrap: true,
    align: 'start',
    gap: theme.toolbar?.small?.gap,
  };
  const layoutProps = isSmall(size) ? smallLayoutProps : defaultLayoutProps;
  return (
    <Box flex={false} cssGap {...layoutProps} {...rest}>
      {children}
    </Box>
  );
};

Toolbar.propTypes = ToolbarPropTypes;
