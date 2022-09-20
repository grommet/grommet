import React, { useContext } from 'react';
import { Box } from '../Box';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { FilterBarPropTypes } from './propTypes';

const defaultLayoutProps = { direction: 'row', align: 'center', gap: 'xsmall' };

const smallLayoutProps = {
  direction: 'column',
  align: 'end',
};

export const FilterBar = ({ children, ...rest }) => {
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

FilterBar.propTypes = FilterBarPropTypes;

FilterBar.defaultProps = {};
