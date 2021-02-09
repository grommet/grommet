import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Box } from '../Box';

export const Spinner = forwardRef(({ color, size, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const spinnerSize =
    theme.spinner.size[size] || size || theme.spinner.size.medium;
  return (
    <Box
      animation={{ type: 'rotateRight' }}
      border={[
        { side: 'all', color: 'background-contrast' },
        { side: 'top', color: color || 'brand' },
      ]}
      height={spinnerSize}
      ref={ref}
      round="full"
      width={spinnerSize}
      {...theme.spinner.container}
      {...rest}
    />
  );
});
