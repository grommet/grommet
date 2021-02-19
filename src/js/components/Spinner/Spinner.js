import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { defaultProps } from '../../default-props';

// prop of a message to connect with announce

const BasicSpinner = ({ theme, spinnerSize, ...rest }) => (
  <Box
    animation="rotateRight"
    height={spinnerSize}
    width={spinnerSize}
    {...theme.spinner?.container}
    {...rest}
  />
);

export const Spinner = forwardRef(({ children, color, size, ...rest }, ref) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const spinnerSize =
    theme.spinner.size[size] || size || theme.spinner.size.small;

  return children ? (
    <BasicSpinner theme={theme} spinnerSize={spinnerSize} ref={ref} {...rest}>
      {children}
    </BasicSpinner>
  ) : (
    <BasicSpinner
      spinnerSize={spinnerSize}
      theme={theme}
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
});
