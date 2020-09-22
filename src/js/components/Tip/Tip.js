import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Drop } from '../Drop';

// rename targetRef to ref
export const Tip = forwardRef(({ children, targetRef, ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return (
    <Drop
      align={{ left: 'right' }} // most common use case is sidebar
      target={targetRef}
      trapFocus={false}
      plain
      {...theme.tip}
      {...rest}
      ref={ref}
    >
      <Box {...theme.tip.container}>{children}</Box>
    </Drop>
  );
});

Tip.propTypes = {
  children: PropTypes.node,
};

Tip.defaultProps = {
  children: undefined,
};
