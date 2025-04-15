import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ToolbarPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';

const defaultLayoutProps = {
  direction: 'row',
  align: 'start',
  // TO DO theme object
  gap: 'small',
};

const smallLayoutProps = {
  direction: 'row',
  wrap: true,
  align: 'start',
  // TO DO theme object
  gap: 'small',
};

export const Toolbar = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const layoutProps = isSmall(size) ? smallLayoutProps : defaultLayoutProps;
  return (
    <Box flex={false} cssGap {...layoutProps} {...rest}>
      {children}
    </Box>
  );
};

Toolbar.propTypes = ToolbarPropTypes;
