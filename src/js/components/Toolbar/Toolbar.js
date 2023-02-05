import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ToolbarPropTypes } from './propTypes';

const defaultLayoutProps = {
  direction: 'row',
  align: 'start',
  gap: 'small',
};

const smallLayoutProps = {
  direction: 'row',
  wrap: true,
  align: 'start',
  gap: 'small',
};

export const Toolbar = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const layoutProps =
    size === 'small' || size === 'xsmall'
      ? smallLayoutProps
      : defaultLayoutProps;
  return (
    <Box flex={false} cssGap {...layoutProps} {...rest}>
      {children}
    </Box>
  );
};

Toolbar.propTypes = ToolbarPropTypes;

Toolbar.defaultProps = {};
