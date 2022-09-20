import React from 'react';
import { Box } from '../Box';
import { FiltersPropTypes } from './propTypes';

export const Filters = ({ children, ...rest }) => (
  <Box {...rest}>{children}</Box>
);

Filters.propTypes = FiltersPropTypes;

Filters.defaultProps = {};
