import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Drop } from '../Drop';

export const Tip = forwardRef(({ children, targetRef, ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  return (
    <Drop
      target={targetRef}
      trapFocus={false}
      {...theme.tip}
      {...rest}
      ref={ref}
    >
      <Box background="red" {...theme.tip.container}>
        {children}
      </Box>
    </Drop>
  );
});

Tip.propTypes = {
  children: PropTypes.node,
};

Tip.defaultProps = {
  children: undefined,
};
