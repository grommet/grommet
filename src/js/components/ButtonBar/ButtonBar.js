import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { ButtonBarPropTypes } from './propTypes';

const defaultLayoutProps = { direction: 'row', align: 'center', gap: 'small' };

const smallLayoutProps = {
  direction: 'column',
  align: 'end',
};

export const ButtonBar = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const layoutProps =
    size === 'small' || size === 'xsmall'
      ? smallLayoutProps
      : defaultLayoutProps;
  return (
    <Box {...layoutProps} {...rest}>
      {children}
    </Box>
  );
};

ButtonBar.propTypes = ButtonBarPropTypes;

ButtonBar.defaultProps = {};
