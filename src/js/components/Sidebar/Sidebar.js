import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box';

export const Sidebar = ({ children, footer, header, ...rest }) => (
  <Box pad="small" gap="large" height={{ min: '100%' }} {...rest}>
    {header}
    <Box flex>{children}</Box>
    {footer}
  </Box>
);

Sidebar.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
};

Sidebar.defaultProps = {
  children: undefined,
  footer: undefined,
  header: undefined,
};
