import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Box } from '../Box';

// prop of a message too connect with announce
// box props themeable
// adjust border to size
// No need of label
// styled-component for display block
// children

export const Spinner = forwardRef(({ color, size = 'small', ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const spinnerSize = theme.spinner.size[size] || size;

  console.log('spinnerSize', spinnerSize);
  return (
    <Box
      animation={{ type: 'rotateRight' }}
      border={[
        { side: 'all', color: 'background-contrast', size },
        { side: 'top', color: color || 'brand', size },
      ]}
      height={spinnerSize}
      ref={ref}
      round="full"
      width={spinnerSize}
      pad="small"
      {...theme.spinner?.container}
      {...rest}
    />
  );
});
