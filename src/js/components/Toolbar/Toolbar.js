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
  direction: 'column',
  align: 'start',
};

export const Toolbar = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const layoutProps =
    size === 'small' || size === 'xsmall'
      ? smallLayoutProps
      : defaultLayoutProps;
  return (
    <Box flex={false} {...layoutProps} {...rest}>
      {children}
    </Box>
  );
};

Toolbar.propTypes = ToolbarPropTypes;

Toolbar.defaultProps = {};
