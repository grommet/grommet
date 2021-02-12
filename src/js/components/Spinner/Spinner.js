import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Box } from '../Box';

// prop of a message too connect with announce
// children

const BasicSpinner = ({ theme, spinnerSize, ...rest }) => (
  <Box
    animation={{ type: 'rotateRight' }}
    height={spinnerSize}
    width={spinnerSize}
    {...theme.spinner?.container}
    {...rest}
  />
);

export const Spinner = forwardRef(
  ({ children, color, size = 'small', ...rest }, ref) => {
    const theme = useContext(ThemeContext);
    const spinnerSize = theme.spinner.size[size] || size;

    console.log('spinnerSize', spinnerSize);
    return children ? (
      <BasicSpinner theme={theme} spinnerSize={spinnerSize} ref={ref} {...rest}>
        {children}
      </BasicSpinner>
    ) : (
      <BasicSpinner
        spinnerSize={spinnerSize}
        theme
        ref={ref}
        border={[
          { side: 'all', color: 'background-contrast', size },
          { side: 'top', color: color || 'brand', size },
        ]}
        round="full"
        pad="small"
        {...rest}
      />
    );
  },
);
